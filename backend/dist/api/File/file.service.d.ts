export declare class FileService {
    private readonly uploadPath;
    saveFile(file: Express.Multer.File): Promise<{
        url: string;
        test: string;
    }>;
    saveMultipleFiles(files: Express.Multer.File[]): Promise<{
        url: string;
        test: string;
    }[]>;
}
