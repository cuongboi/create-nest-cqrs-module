import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateNameCommand } from "./commands/create-name.command";
import { UpdateNameCommand } from "./commands/update-name.command";
import { DeleteNameCommand } from "./commands/delete-name.command";
import { GetNameQuery } from "./queries/get-name.query";
import { GetNamesQuery } from "./queries/get-names.query";
import { CreateNameDto } from "./dtos/create-name.dto";
import { UpdateNameDto } from "./dtos/update-name.dto";
import { NameEntity } from "./name.entity";

@Injectable()
export class NameService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async createName(createNameDto: CreateNameDto): Promise<NameEntity> {
    return this.commandBus.execute(new CreateNameCommand(createNameDto));
  }

  async updateName(
    id: number,
    updateNameDto: UpdateNameDto
  ): Promise<NameEntity> {
    return this.commandBus.execute(new UpdateNameCommand(id, updateNameDto));
  }

  async deleteName(id: number): Promise<void> {
    return this.commandBus.execute(new DeleteNameCommand(id));
  }

  async getName(id: number): Promise<NameEntity | null> {
    return this.queryBus.execute(new GetNameQuery(id));
  }

  async getNames(): Promise<NameEntity[]> {
    return this.queryBus.execute(new GetNamesQuery());
  }
}
