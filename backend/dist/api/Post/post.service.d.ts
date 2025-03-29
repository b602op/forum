import { Repository } from 'typeorm';
import { Post as PostEntity } from '../../database/schema';
import { UpdatePostDto, CreatePostDto } from '../dto/post.dto';
export declare class PostService {
    private readonly postRepository;
    constructor(postRepository: Repository<PostEntity>);
    findAll(): Promise<PostEntity[]>;
    findOne(id: number): Promise<PostEntity | null>;
    create(createPostDto: CreatePostDto): Promise<PostEntity>;
    update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity | null>;
    remove(id: number): Promise<void>;
}
