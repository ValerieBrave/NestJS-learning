import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './models/file.model';
import { User } from './models/user.model';
import { FileRepository } from './repositories/files.repository';
import { UserRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';


@Module({
  imports: [TypeOrmModule.forFeature([User, File, UserRepository, FileRepository])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
