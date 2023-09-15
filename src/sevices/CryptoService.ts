import { api } from "../http";
import NodeRSA from "node-rsa";
import { v4 } from "uuid";
import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";

const key = new NodeRSA({ b: 512 });

key.setOptions({ environment: "browser" });

export class CryptoService {
  async fetchPrivateKey() {
    const response = await api.get("/publicKey");

    const { sessionId, publicKey } = response.data;
    key.importKey(publicKey, "pkcs1-public-pem");

    const secret = v4();
    const secretKey = key.encrypt(secret, "base64");

    localStorage.setItem("key", secret);
    localStorage.setItem("sessionId", sessionId);

    await api.post("/secretKey", { secretKey });
  }

  decryptData(data: string) {
    const secretKey = localStorage.getItem("key")!;
    const bytes = AES.decrypt(data, secretKey);
    const dataJson = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(dataJson);
  }

  encryptData(data: unknown) {
    const secretKey = localStorage.getItem("key")!;
    const dataJson = JSON.stringify(data);
    return AES.encrypt(dataJson, secretKey).toString();
  }
}

export const cryptoService = new CryptoService();
