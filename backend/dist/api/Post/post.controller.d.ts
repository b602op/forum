import { PostService } from './post.service';
import { UpdatePostDto, CreatePostDto } from '../dto/post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getAllPosts(): Promise<import("../../database/schema").Post[]>;
    getPostById(id: number): Promise<import("../../database/schema").Post | null>;
    createPost(createPostDto: CreatePostDto): Promise<import("../../database/schema").Post>;
    updatePost(id: number, updatePostDto: UpdatePostDto): Promise<import("../../database/schema").Post | null>;
    deletePost(id: number): Promise<void>;
}
