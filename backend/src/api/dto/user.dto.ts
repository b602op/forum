export class UserDto {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: Date;
  about: string;
  email: string;
  phone: string;
  avatar: string;
}

// update
 export class UpdateUserDto {
  first_name?: string;
  last_name?: string;
  birth_date?: Date;
  about?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

// create
export class CreateUserDto {
  first_name: string;
  last_name: string;
  birth_date: Date;
  about: string;
  email: string;
  phone: string;
  avatar: string;
}
