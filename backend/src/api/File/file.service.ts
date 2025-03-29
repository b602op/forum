import { Injectable } from '@nestjs/common';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class FileService {
  private readonly uploadPath = "/app/static";

  private generateUniqueFileName(originalname: string): string {
    const extension = originalname.split('.').pop();
    const uniqueName = randomUUID();
    return extension ? `${uniqueName}.${extension}` : uniqueName;
  }

  async saveFile(file: Express.Multer.File) {
    try {
      await mkdir(this.uploadPath, { recursive: true });

      const uniqueFileName = this.generateUniqueFileName(file.originalname);
      const filePath = join(this.uploadPath, uniqueFileName);

      await writeFile(filePath, file.buffer);
      return { url: `/static/${uniqueFileName}` };
    } catch (error) {
      throw new Error(`Ошибка сохранения файла: ${error.message}`);
    }
  }

  async saveMultipleFiles(files: Express.Multer.File[]) {
    return Promise.all(files.map(file => this.saveFile(file)));
  }
}