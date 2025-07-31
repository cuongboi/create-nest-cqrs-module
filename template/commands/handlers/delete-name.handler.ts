import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NameRepository } from "../../name.repository";
import { DeleteNameCommand } from "../delete-name.command";

@CommandHandler(DeleteNameCommand)
export class DeleteNameHandler implements ICommandHandler<DeleteNameCommand> {
  constructor(private readonly nameRepository: NameRepository) {}

  async execute(command: DeleteNameCommand): Promise<void> {
    const { id } = command;
    await this.nameRepository.delete(id);
  }
}
