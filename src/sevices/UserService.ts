import { api } from "../http";
import { IUpdateCredentials, IUser } from "../types";
import { cryptoService } from "./CryptoService";

export class UserService {
  static async getUser(): Promise<IUser | null> {
    if (localStorage.getItem("token")) {
      const response = await api.get("/user");
      const user = response.data;

      for (const field in user) {
        user[field] = cryptoService.decryptData(user[field]);
      }

      return user;
    }
    return null;
  }

  static async updateUser(data: IUpdateCredentials): Promise<IUser | null> {
    for (const field in data) {
      (data as unknown as Record<string, string>)[field] =
        cryptoService.encryptData(
          (data as unknown as Record<string, string>)[field]
        );
    }
    const response = await api.post("/update", {
      ...data,
    });

    const user = response.data;

    for (const field in user) {
      user[field] = cryptoService.decryptData(user[field]);
    }

    return user;
  }
}
