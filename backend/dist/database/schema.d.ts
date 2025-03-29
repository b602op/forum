export declare class User {
    id: number;
    first_name: string;
    last_name: string;
    birth_date: Date;
    about: string;
    email: string;
    phone: string;
    avatar: string;
    created_at: Date;
    updated_at: Date;
}
export declare class Post {
    id: number;
    text: string;
    images: string[];
    created_at: Date;
    updated_at: Date;
    author_id: number;
    author_name: string;
}
export declare function createSchema(): Promise<void>;
