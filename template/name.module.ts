import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { NameController } from "./name.controller";
import { NameService } from "./name.service";
import { NameRepository } from "./name.repository";
import { CreateNameHandler } from "./commands/handlers/create-name.handler";
import { UpdateNameHandler } from "./commands/handlers/update-name.handler";
import { DeleteNameHandler } from "./commands/handlers/delete-name.handler";
import { GetNameHandler } from "./queries/handlers/get-name.handler";
import { GetNamesHandler } from "./queries/handlers/get-names.handler";
import { NameCreatedHandler } from "./events/handlers/name-created.handler";

@Module({
  imports: [CqrsModule],
  controllers: [NameController],
  providers: [
    NameService,
    NameRepository,
    CreateNameHandler,
    UpdateNameHandler,
    DeleteNameHandler,
    GetNameHandler,
    GetNamesHandler,
    NameCreatedHandler,
  ],
})
export class NamesModule {}
