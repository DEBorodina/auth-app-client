import { api } from "../http";
import { IUser } from "../types";
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
    const userIdEncrypted = response.data;
    const userId = cryptoService.decryptData(userIdEncrypted);

    sessionStorage.setItem("user-id", userId);
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

    const userIdEncrypted = response.data;
    const userId = cryptoService.decryptData(userIdEncrypted);

    sessionStorage.setItem("user-id", userId);
  }

  static async verifyCode(code: string): Promise<IUser> {
    const userIdToEncrypt = sessionStorage.getItem("user-id");
    sessionStorage.removeItem("user-id");

    code = cryptoService.encryptData(code);
    const userId = cryptoService.encryptData(userIdToEncrypt);

    const response = await api.post("/verify-code", {
      code,
      userId,
    });
    const { user, token } = response.data;

    for (const field in user) {
      user[field] = cryptoService.decryptData(user[field]);
    }

    const encryptedToken = cryptoService.decryptData(token);

    localStorage.setItem("token", encryptedToken);

    return user;
  }

  static async logout() {
    await api.get("/logout");
    localStorage.removeItem("token");
  }
}
