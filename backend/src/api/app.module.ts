import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './User/user.service';
import { ProfileController } from './User/user.controller';
import { PostController } from './Post/post.controller';
import { PostService } from './Post/post.service';
import { User, Post } from 'src/database/schema';
import { FileController } from './File/file.controller';
import { ServeStaticModule,  } from '@nestjs/serve-static';
import { FileService } from './File/file.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: "/app/static",
      serveRoot: '/static',
      serveStaticOptions: {
        fallthrough: false,
        index: false,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: () => ({
        type: 'postgres',
        host: 'postgres',
        port: 5432,
        username: 'admin',
        password: '12345',
        database: 'project_db',
        entities: [User, Post],
        synchronize: false,
        logging: true,
      }),
      inject: [],
    }),
    TypeOrmModule.forFeature([User, Post])
  ],
  controllers: [ProfileController, PostController, FileController],
  providers: [UserService, PostService, FileService],
})
export class AppModule {}