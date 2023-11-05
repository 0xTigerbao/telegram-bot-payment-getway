import { BadRequestException, Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {

  constructor(
    private usersService: UsersService
  ) {
  }

  @Post("link-wallet")
  async linkWallet(
    @Req() req: Request
  ) {
    const { signature, message, userId, wallet } = req.body;
    if (!signature || !message || !userId || !wallet) {
      throw new BadRequestException();
    }
    await this.usersService.linkWallet(req.body);
    return "success";
  }
}
