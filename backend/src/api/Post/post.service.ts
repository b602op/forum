import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post as PostEntity } from '../../database/schema';
import { UpdatePostDto, CreatePostDto } from '../dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  findAll(): Promise<PostEntity[]> {
    return this.postRepository.find();
  }

  findOne(id: number): Promise<PostEntity | null> {
    return this.postRepository.findOne({ where: { id }, relations: ['user'] });
  }

  create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async update(id: number, updatePostDto: Partial<UpdatePostDto>) {
    await this.postRepository.update(id, { ...updatePostDto, id });
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
