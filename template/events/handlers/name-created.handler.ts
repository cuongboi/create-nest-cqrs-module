import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { NameCreatedEvent } from "../name-created.event";

@EventsHandler(NameCreatedEvent)
export class NameCreatedHandler implements IEventHandler<NameCreatedEvent> {
  handle(event: NameCreatedEvent) {
    console.log(`Name created with ID: ${event.nameId}, Title: ${event.title}`);
  }
}
