import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { UpdatePostDto, CreatePostDto } from '../dto/post.dto';

@Controller('api/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPosts() {
    return this.postService.findAll();
  }

  @Get(':id')
  async getPostById(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto, ' createPostDto?')
    return this.postService.create(createPostDto);
  }

  @Put(':id')
  async updatePost(@Param('id') id: number, @Body() updatePostDto: Partial<UpdatePostDto>) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    return this.postService.remove(id);
  }
}
