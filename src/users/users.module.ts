import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { OnchainModule } from "../onchain/onchain.module";
import { UsersController } from "./users.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [OnchainModule, PrismaModule, ConfigModule.forRoot()],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {
}
