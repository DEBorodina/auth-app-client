import { api } from "../http";
import { IUser, IUserData } from "../types";
import { cryptoService } from "./CryptoService";

export type AuthResponse = {
  accessToken: string;
  user: IUser;
};

export class AuthService {
  static async login(email: string, password: string): Promise<void> {
    email = cryptoService.encryptData(email);
    password = cryptoService.encryptData(password);

    const response = await api.post("/login", { email, password });

    const token = cryptoService.decryptData(response.data);

    localStorage.setItem("token", token);
  }

  static async registration(
    email: string,
    password: string,
    name: string,
    lastName: string
  ): Promise<void> {
    email = cryptoService.encryptData(email);
    password = cryptoService.encryptData(password);
    name = cryptoService.encryptData(name);
    lastName = cryptoService.encryptData(lastName);

    const response = await api.post("/registration", {
      email,
      password,
      name,
      lastName,
    });

    const token = cryptoService.decryptData(response.data);

    localStorage.setItem("token", token);
  }

  static async verifyCode(code: string): Promise<IUserData> {
    code = cryptoService.encryptData(code);
    const response = await api.post("/verify-code", {
      code,
    });
    const { user, messages } = response.data;

    for (const field in user) {
      user[field] = cryptoService.decryptData(user[field]);
    }

    const decryptedMessage = cryptoService.decryptData(messages);

    return { user, messages: decryptedMessage };
  }

  static async logout() {
    await api.get("/logout");
    localStorage.removeItem("token");
  }
}
