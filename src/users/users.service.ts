import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './models/file.model';
import { User } from './models/user.model';
import * as path from 'path';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(File)
        private fileRepository: Repository<File>
      ) {}
    async saveUser(name: string, email: string, birthday: string, password: string) {
        //birthday format dd/mm/yyyy
        const user = new User(name, email, new Date(birthday));
        await user.hashPassword(password);
        await this.userRepository.save(user);
    }

    async saveFile(jobId: number, files: Array<Express.Multer.File>) {
        files.forEach(async file => {
            await this.fileRepository.save(new File(jobId, path.join(__dirname, '../../uploads'), file.filename))
        })
    }
}
