import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NameRepository } from "../../name.repository";
import { UpdateNameCommand } from "../update-name.command";
import { NameEntity } from "../../name.entity";

@CommandHandler(UpdateNameCommand)
export class UpdateNameHandler implements ICommandHandler<UpdateNameCommand> {
  constructor(private readonly nameRepository: NameRepository) {}

  async execute(command: UpdateNameCommand): Promise<NameEntity> {
    const { id, updateNameDto } = command;
    return this.nameRepository.update(id, updateNameDto);
  }
}
