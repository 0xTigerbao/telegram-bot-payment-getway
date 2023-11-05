import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { BotModule } from "./bot/bot.module";
import { OnchainModule } from "./onchain/onchain.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [UsersModule, BotModule, OnchainModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
