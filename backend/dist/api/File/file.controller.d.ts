import { FileService } from './file.service';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
        test: string;
    }>;
    uploadMultipleFiles(files: Express.Multer.File[]): Promise<{
        url: string;
        test: string;
    }[]>;
}
