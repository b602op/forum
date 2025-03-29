import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('api/files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.saveFile(file);
  }

  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files', 10))
  uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return this.fileService.saveMultipleFiles(files);
  }
}