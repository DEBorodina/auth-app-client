import { api } from "../http";
import { IFile } from "../types";
import { cryptoService } from "./CryptoService";

class FileService {
  async getFiles(): Promise<IFile[]> {
    const response = await api.get("/files");

    const files = cryptoService.decryptData(response.data);
    return JSON.parse(files);
  }
}

export const fileService = new FileService();
