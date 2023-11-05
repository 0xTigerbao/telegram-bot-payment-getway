import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { TelegrafModule } from "nestjs-telegraf";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>("TELEGRAM_BOT_TOKEN")
      }),
      inject: [ConfigService]
    })],
  providers: [BotService]
})
export class BotModule {
}
