import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Address, Hex, verifyTypedData } from "viem";

@Injectable()
export class OnchainService {


  constructor(
    private readonly configService: ConfigService
  ) {
  }

  async verifyLinkWallet(signature: Hex, payload: any, address: Address): Promise<boolean> {
    try {
      return await verifyTypedData({
        address,
        domain: {
          name: "TelegramGateway",
          version: "1"
        },
        types: {
          TelegramGateway: [
            { name: "wallet", type: "address" },
            { name: "contents", type: "string" }
          ]
        },
        primaryType: "TelegramGateway",
        message: payload,
        signature
      });
    } catch (e) {
      return false;
    }
  }
}
