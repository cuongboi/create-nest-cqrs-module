import { UpdateNameDto } from "../dtos/update-name.dto";

export class UpdateNameCommand {
  constructor(
    public readonly id: number,
    public readonly updateNameDto: UpdateNameDto
  ) {}
}
