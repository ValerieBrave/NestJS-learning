import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { File } from './users/data/models/file.model';
import { User } from './users/data/models/user.model';
import { UsersModule } from './users/users.module';
import { PostLogger } from './util/logging/post.logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, File],
    synchronize: true,
  }),
    UsersModule],
    providers: [PostLogger]
})
export class AppModule {}
