import { Module } from "@nestjs/common";
import { OnchainService } from "./onchain.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [OnchainService],
  exports: [OnchainService]
})
export class OnchainModule {
}
