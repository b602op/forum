export declare class UserDto {
    id: number;
    first_name: string;
    last_name: string;
    birth_date: Date;
    about: string;
    email: string;
    phone: string;
    avatar: string;
}
export declare class UpdateUserDto {
    first_name?: string;
    last_name?: string;
    birth_date?: Date;
    about?: string;
    email?: string;
    phone?: string;
    avatar?: string;
}
export declare class CreateUserDto {
    first_name: string;
    last_name: string;
    birth_date: Date;
    about: string;
    email: string;
    phone: string;
    avatar: string;
}
