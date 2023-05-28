import { RouterOSAPI } from "node-routeros";
import { UserManager } from "./UserManager.js";
import dotenv from "dotenv";
dotenv.config();
export const MikrotikConnetion = new RouterOSAPI({
  host: process.env.MIKROTIK_HOST,
  user: process.env.MIKROTIK_USER,
  password: process.env.MIKROTIK_PASSWORD,
  port: process.env.MIKROTIK_PORT,
  keepalive: true,
});

export class Mikrotik {
  static async login() {
    try {
      if (!MikrotikConnetion.connected) {
        await MikrotikConnetion.connect();
        return MikrotikConnetion.connected;
      }
      return MikrotikConnetion.connected;
    } catch (error) {
      return false;
    }
  }
  static UserManager = UserManager;
}
