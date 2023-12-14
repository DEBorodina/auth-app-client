import { api } from "../http";
import { IFile } from "../types";
import { cryptoService } from "./CryptoService";

class FileService {
  async getFiles(): Promise<IFile[]> {
    const response = await api.get("/files");

    const files = cryptoService.decryptData(response.data);

    return files;
  }

  async addFile(fileName: string, fileContent: string): Promise<IFile[]> {
    const file = cryptoService.encryptData({
      fileName,
      fileContent,
    });
    const response = await api.post("/files", { file });

    const files = cryptoService.decryptData(response.data);

    return files;
  }
}

export const fileService = new FileService();
