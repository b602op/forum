import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Controller('api/users')
export class ProfileController {
  constructor(private readonly profileService: UserService) {}

  @Get()
  async getAllProfiles() {
    return this.profileService.findAll();
  }

  @Get(':id')
  async getProfileById(@Param('id') id: number) {
    return this.profileService.findOne(id);
  }

  @Post()
  async createProfile(@Body() createUserDto: CreateUserDto) {
    return this.profileService.create(createUserDto);
  }

  @Put(':id')
  async updateProfile(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.profileService.update(id, updateUserDto);
  }

  @Delete(':id')
  async deleteProfile(@Param('id') id: number) {
    return this.profileService.remove(id);
  }
}