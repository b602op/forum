import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: UserService);
    getAllProfiles(): Promise<import("../../database/schema").User[]>;
    getProfileById(id: number): Promise<import("../../database/schema").User | null>;
    createProfile(createUserDto: CreateUserDto): Promise<import("../../database/schema").User>;
    updateProfile(id: number, updateUserDto: UpdateUserDto): Promise<import("../../database/schema").User | null>;
    deleteProfile(id: number): Promise<void>;
}
