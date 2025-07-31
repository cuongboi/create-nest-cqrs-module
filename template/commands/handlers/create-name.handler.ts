import { CommandHandler, ICommandHandler, EventBus } from "@nestjs/cqrs";
import { NameRepository } from "../../name.repository";
import { CreateNameCommand } from "../create-name.command";
import { NameEntity } from "../../name.entity";
import { NameCreatedEvent } from "../../events/name-created.event";

@CommandHandler(CreateNameCommand)
export class CreateNameHandler implements ICommandHandler<CreateNameCommand> {
  constructor(
    private readonly nameRepository: NameRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: CreateNameCommand): Promise<NameEntity> {
    const { createNameDto } = command;
    const name = new NameEntity(
      0,
      createNameDto.title,
      createNameDto.content,
      createNameDto.authorId
    );
    const createdName = await this.nameRepository.create(name);
    this.eventBus.publish(
      new NameCreatedEvent(createdName.id, createdName.title)
    );
    return createdName;
  }
}
