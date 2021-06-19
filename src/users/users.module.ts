import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './data/models/file.model';
import { User } from './data/models/user.model';
import { FileRepository } from './data/repositories/files.repository';
import { UserRepository } from './data/repositories/users.repository';
import { UsersController } from './presentation/users.controller';
import { UsersService } from './service/users.service';


@Module({
  imports: [TypeOrmModule.forFeature([User, File, UserRepository, FileRepository])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
