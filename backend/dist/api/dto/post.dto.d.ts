export declare class PostDto {
    id: number;
    text: string;
    images: string[];
    author_id: number;
    author_name: string;
    created_at: Date;
    updated_at: Date;
}
export declare class UpdatePostDto {
    id: number;
    text?: string;
    images?: string[];
}
export declare class CreatePostDto {
    text: string;
    images?: string[];
    author_id: number;
    author_name: string;
}
