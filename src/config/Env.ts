import "dotenv/config";

export default class Env {
  public static TOKEN: string = process.env.TOKEN!;
}
