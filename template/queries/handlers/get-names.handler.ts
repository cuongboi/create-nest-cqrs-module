import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { NameRepository } from "../../name.repository";
import { GetNamesQuery } from "../get-names.query";
import { NameEntity } from "../../name.entity";

@QueryHandler(GetNamesQuery)
export class GetNamesHandler implements IQueryHandler<GetNamesQuery> {
  constructor(private readonly nameRepository: NameRepository) {}

  async execute(): Promise<NameEntity[]> {
    return this.nameRepository.findAll();
  }
}
