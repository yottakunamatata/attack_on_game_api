import { Request } from 'express';
import { EventRepository } from '@/repositories/eventRepository';
import { LookupService } from './LookupService';
import { CustomError } from '@/errors/CustomError';
import { CustomResponseType } from '@/enums/CustomResponseType';
import { EventResponseType } from '@/types/EventResponseType';
import { EventDTO } from '@/dto/eventDTO';
import { EventDocument } from '@/interfaces/EventInterface';
import { OrderRepository } from '@/repositories/OrderRepository';
import { TicketRepository } from '@/repositories/TicketRepository';

class MyEventService {
  private eventRepository: EventRepository;
  private lookupService: LookupService;

  constructor() {
    this.eventRepository = new EventRepository();
    this.lookupService = new LookupService(
      new OrderRepository(),
      this.eventRepository,
      new TicketRepository(),
    );
  }

  public async getEventById(id: string): Promise<Partial<EventDTO>> {
    const event = await this.lookupService.findEventById(id);
    const eventDTO = new EventDTO(event);
    if (!eventDTO.isPublish) {
      throw new CustomError(
        CustomResponseType.UNAUTHORIZED,
        EventResponseType.FAILED_AUTHORIZATION,
      );
    }
    return eventDTO.toDetailDTO();
  }

  public async getAllEvents(
    queryParams: Request['query'],
  ): Promise<Partial<EventDTO>[]> {
    const eventData = await this.eventRepository.findAll(queryParams);
    if (!eventData.length) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    return eventData.map((event) => new EventDTO(event).toDetailDTO());
  }

  public async createEvent(content: EventDocument): Promise<boolean> {
    const eventDTO = new EventDTO(content).toDetailDTO();
    return await this.eventRepository.create(eventDTO);
  }

  public async updateEvent(
    id: string,
    content: EventDocument,
  ): Promise<Partial<EventDTO> | null> {
    const event = await this.lookupService.findEventById(id);
    const eventDTO = new EventDTO(content).toDetailDTO();
    return await this.eventRepository.update(id, eventDTO);
  }

  public async deleteEvent(id: string): Promise<boolean> {
    return await this.eventRepository.delete(id);
  }
}

export default MyEventService;
