import { Injectable } from "@nestjs/common";
import { NameEntity } from "./name.entity";

@Injectable()
export class NameRepository {
  private names: NameEntity[] = []; // In-memory storage for demo
  private idCounter = 1;

  async create(name: NameEntity): Promise<NameEntity> {
    name.id = this.idCounter++;
    this.names.push(name);
    return name;
  }

  async update(id: number, name: Partial<NameEntity>): Promise<NameEntity> {
    const existingName = await this.findOne(id);
    if (!existingName) throw new Error("Name not found");
    Object.assign(existingName, name);
    return existingName;
  }

  async delete(id: number): Promise<void> {
    this.names = this.names.filter((name) => name.id !== id);
  }

  async findOne(id: number): Promise<NameEntity | null> {
    return this.names.find((name) => name.id === id) || null;
  }

  async findAll(): Promise<NameEntity[]> {
    return this.names;
  }
}
