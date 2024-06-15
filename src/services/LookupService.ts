import { Types } from 'mongoose';
import { Player, IPlayer as PlayerDocument } from '@/models/Player';
import { OrderRepository } from '@/repositories/OrderRepository';
import { EventRepository } from '@/repositories/EventRepository';
import { TicketRepository } from '@/repositories/TicketRepository';
import { CustomError } from '@/errors/CustomError';
import { CustomResponseType } from '@/enums/CustomResponseType';
import { OrderResponseType } from '@/types/OrderResponseType';
import { EventResponseType } from '@/types/EventResponseType';
import { TicketResponseType } from '@/types/TicketResponseType';
import { OrderDocument } from '@/interfaces/OrderInterface';
import { EventDocument } from '@/interfaces/EventInterface';
import { TicketDocument } from '@/interfaces/TicketInterface';

export class LookupService {
  constructor(
    private orderRepository: OrderRepository,
    private eventRepository: EventRepository,
    private ticketRepository: TicketRepository,
  ) {}

  public async findPlayer(userId: string): Promise<PlayerDocument> {
    const player = await Player.findOne({ user: userId });
    if (!player) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        OrderResponseType.ERROR_PLAYER_FOUND,
      );
    }
    return player;
  }

  public async findOrder(orderId: string): Promise<OrderDocument> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        OrderResponseType.FAILED_FOUND,
      );
    }
    return order;
  }

  public async findEventById(eventId: string): Promise<Partial<EventDocument>> {
    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    return event;
  }

  public async findEventByDbId(
    eventId: Types.ObjectId,
  ): Promise<Partial<EventDocument>> {
    const event = await this.eventRepository.findByDBId(eventId);
    if (!event) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    return event;
  }

  public async findTickets(
    orderId: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<TicketDocument[]> {
    const ticketList = await this.ticketRepository.findAll(orderId, userId);
    if (!ticketList.length) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        TicketResponseType.FAILED_FOUND,
      );
    }
    return ticketList;
  }
}
