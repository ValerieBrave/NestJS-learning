import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../data/models/file.model';
import { User } from '../data/models/user.model';
import * as path from 'path';
import { UserRepository } from '../data/repositories/users.repository';
import { FileRepository } from '../data/repositories/files.repository';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
        @InjectRepository(File)
        private fileRepository: FileRepository
      ) {}
    async saveUser(name: string, email: string, birthday: string, password: string) {
        //birthday format dd/mm/yyyy
        const candidate = await this.userRepository.findByEmail(email);
        if( !candidate) {
            const user = new User(name, email, new Date(birthday));
            await user.hashPassword(password);
            await this.userRepository.save(user);
        }
    }

    async saveFile(email: string, files: Array<Express.Multer.File>) {
        const user = await this.userRepository.findByEmail(email)
        console.log(user)
        files.forEach(async file => {

            await this.fileRepository.save(new File(user.id, path.join(__dirname, '../../uploads'), file.filename))
        })
    }
}
