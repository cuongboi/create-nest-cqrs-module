import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { NameRepository } from "../../name.repository";
import { GetNameQuery } from "../get-name.query";
import { NameEntity } from "../../name.entity";

@QueryHandler(GetNameQuery)
export class GetNameHandler implements IQueryHandler<GetNameQuery> {
  constructor(private readonly nameRepository: NameRepository) {}

  async execute(query: GetNameQuery): Promise<NameEntity | null> {
    const { id } = query;
    return this.nameRepository.findOne(id);
  }
}
