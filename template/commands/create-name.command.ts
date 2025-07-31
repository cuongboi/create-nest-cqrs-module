import { CreateNameDto } from "../dtos/create-name.dto";

export class CreateNameCommand {
  constructor(public readonly createNameDto: CreateNameDto) {}
}
