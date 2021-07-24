import "dotenv/config";

export default class Env {
  public static TOKEN: string = process.env.TOKEN!;
  public static NAME: string = process.env.NAME || "Disc Bot";
  public static PREFIX: string = process.env.PREFIX || "!"; 
}
