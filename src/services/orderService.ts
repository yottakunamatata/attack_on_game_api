import { Request } from 'express';
import { OrderRepository } from '@/repositories/OrderRepository';
import { EventRepository } from '@/repositories/EventRepository';
import { TicketRepository } from '@/repositories/TicketRepository';
import { LookupService } from './LookupService';
import { OrderDTO } from '@/dto/orderDTO';
import { CustomError } from '@/errors/CustomError';
import { CustomResponseType } from '@/enums/CustomResponseType';
import { OrderResponseType } from '@/types/OrderResponseType';
import { OrderDocument } from '@/models/Order';
import { EventDocument } from '@/models/Event';
import { PlayerDocument } from '@/models/Player';
import { Types } from 'mongoose';

class OrderService {
  private orderRepository: OrderRepository;
  private lookupService: LookupService;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.lookupService = new LookupService(
      this.orderRepository,
      new EventRepository(),
      new TicketRepository(),
    );
  }

  public async createOrder(req: Request): Promise<OrderDocument> {
    const { eventId, playerId, body } = req.body;

    const event = await this.lookupService.findEventById(eventId);
    const player = await this.lookupService.findPlayer(playerId);

    const orderDTO = this.createOrderDTO(body, event, player);
    this.validateOrder(event, orderDTO);

    const order = await this.createOrder(orderDTO);
    await this.updateEventParticipants(event, orderDTO);
    await this.createTickets(order._id, playerId, orderDTO.registrationCount);

    return order;
  }

  public async getOrderById(id: string): Promise<OrderDocument> {
    return await this.lookupService.findOrder(id);
  }

  public async getOrdersByPlayerId(
    playerId: Types.ObjectId,
    query: any,
  ): Promise<OrderDTO[]> {
    const queryObject: any = { playerId };
    if (query.status) {
      queryObject.status = query.status;
    }

    const orders = await this.orderRepository.findAll(queryObject, {
      limit: query.limit,
      skip: query.skip,
    });

    if (!orders.length) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        OrderResponseType.FAILED_FOUND,
      );
    }

    return orders.map((order) => new OrderDTO(order));
  }

  private createOrderDTO(
    body: any,
    event: Partial<EventDocument>,
    player: PlayerDocument,
  ): OrderDTO {
    return new OrderDTO({
      ...body,
      eventId: event._id,
      playerId: player.user,
    });
  }

  private validateOrder(
    event: Partial<EventDocument>,
    orderDTO: OrderDTO,
  ): void {
    const targetEventDTO = new EventDTO(event);

    if (!targetEventDTO.isRegisterable) {
      throw new CustomError(
        CustomResponseType.VALIDATION_ERROR,
        OrderResponseType.CREATED_ERROR_REGISTRATION_PERIOD,
      );
    }

    if (
      targetEventDTO.participationFee * orderDTO.registrationCount !==
      orderDTO.getTotalAmount()
    ) {
      throw new CustomError(
        CustomResponseType.VALIDATION_ERROR,
        OrderResponseType.CREATED_ERROR_MONEY,
      );
    }

    if (targetEventDTO.availableSeat < orderDTO.registrationCount) {
      throw new CustomError(
        CustomResponseType.VALIDATION_ERROR,
        OrderResponseType.CREATED_ERROR_EXCEEDS_CAPACITY,
      );
    }
  }

  private async createOrder(orderDTO: OrderDTO): Promise<OrderDocument> {
    return await this.orderRepository.create(orderDTO.toDetailDTO());
  }

  private async updateEventParticipants(
    event: Partial<EventDocument>,
    orderDTO: OrderDTO,
  ): Promise<void> {
    const targetEventDTO = new EventDTO(event);
    const addedSeat =
      targetEventDTO.currentParticipantsCount + orderDTO.registrationCount;
    await this.lookupService.updateParticipantsCount(targetEventDTO, addedSeat);
  }

  private async createTickets(
    orderId: Types.ObjectId,
    userId: Types.ObjectId,
    registrationCount: number,
  ): Promise<void> {
    const ticketPromises = [];
    for (let index = 0; index < registrationCount; index++) {
      ticketPromises.push(this.lookupService.createTicket(orderId, userId));
    }
    await Promise.all(ticketPromises);
  }
}

export default OrderService;
