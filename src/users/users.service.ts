import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Scenes } from "telegraf";
import { ConfigService } from "@nestjs/config";
import { SiweMessage } from "siwe";
import { OnchainService } from "../onchain/onchain.service";

@Injectable()
export class UsersService {
  private readonly debug = new Logger(UsersService.name);
  private MESSAGE: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly onchainService: OnchainService
  ) {
    this.MESSAGE = this.configService.get("APP_MESSAGE");
  }

  public async register(ctx: Scenes.WizardContext) {
    const { id, is_bot, username } = ctx.from;
    if (is_bot) {
      return;
    }
    try {
      const user = await this.prismaService.user.create({
        data: {
          telegramId: id.toString(),
          username
        }
      });
      this.debug.log(`create new User #${user.telegramId} @${user.username}`);
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public async linkWallet({ signature, message, userId, wallet }) {
    // const user = await this.prismaService.user.findFirst({ where: { id: userId } });
    // if (!user) throw new UnauthorizedException();
    // if (user.wallet) {
    //   throw new HttpException(
    //     "user wallet linked!",
    //     HttpStatus.CONFLICT
    //   );
    // }
    const valid = await this.onchainService.verifyLinkWallet(signature, message, wallet);
    if (valid) {
      // await this.prismaService.user.update({
      //   where: {
      //     id: user.id
      //   },
      //   data: { wallet }
      // });
    } else {
      throw new BadRequestException();
    }
  }
}
