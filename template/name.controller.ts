import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { NameService } from "./name.service";
import { CreateNameDto } from "./dtos/create-name.dto";
import { UpdateNameDto } from "./dtos/update-name.dto";
import { NameEntity } from "./name.entity";

@Controller("names")
export class NameController {
  constructor(private readonly nameService: NameService) {}

  @Post()
  async create(@Body() createPostDto: CreateNameDto): Promise<NameEntity> {
    return this.nameService.createName(createPostDto);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updatePostDto: UpdateNameDto
  ): Promise<NameEntity> {
    return this.nameService.updateName(id, updatePostDto);
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.nameService.deleteName(id);
  }

  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number
  ): Promise<NameEntity | null> {
    return this.nameService.getName(id);
  }

  @Get()
  async findAll(): Promise<NameEntity[]> {
    return this.nameService.getNames();
  }
}
