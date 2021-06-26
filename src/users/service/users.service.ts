import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as path from 'path';

import { UserRepository } from '../data/repositories/users.repository';
import { FileService } from './file.service';
import { File } from '../data/models/file.model';
import { User } from '../data/models/user.model';
import { PostLogger } from 'src/util/logging/post.logger';
import { COLORS } from 'src/util/logging/colors';

@Injectable()
export class UsersService {
    private logger : PostLogger;
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
        private fileService: FileService
      ) {
          this.logger = new PostLogger(UsersService.name);
      }
    async saveUser(name: string, email: string, birthday: string, password: string) {
        //birthday format mm/dd/yyyy
        const candidate = await this.userRepository.findByEmail(email);
        if( !candidate) {
            this.logger.write('User not found in DB', COLORS.YELLOW)
            const user = new User(name, email, new Date(birthday));
            await user.hashPassword(password);
            await this.userRepository.save(user);
            return user;
        }
        this.logger.write('User found in DB', COLORS.GREEN)
        return candidate;
    }

    async saveFile(email: string, files: Array<Express.Multer.File>) {
        
        const user = await this.userRepository.findByEmail(email)
        if(!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        const DB_operations = [] as Array<() => Promise<File>>
        const FS_operations = [] as Array<() => Promise<void>>
        files.forEach(file => {
            DB_operations.push(
                this.fileService.saveFileToDB.bind(
                    this.fileService,
                    user.id,
                    file
                )
            )
            let name: string = file.originalname
            FS_operations.push(
                this.fileService.saveFileToFS.bind(
                    this.fileService,
                    path.join('D://NestJS//nest-learning//uploads', name),
                    file
                )
            )
        })
        await Promise.all(DB_operations.map(cb => cb()))
        await Promise.all(FS_operations.map(cb => cb()))
    }
}
