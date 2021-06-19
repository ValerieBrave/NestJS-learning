import { Body, Controller, Post, Req, Res, UploadedFile, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response, Request, response } from 'express';
import { PostDto } from './dto/post.dto';
import { diskStorage } from 'multer';
import { UsersService } from '../service/users.service';
import { Stream } from 'stream';
import * as fs from 'fs';
import * as streamifier from 'streamifier';
import * as path from 'path';
import { ValidationPipe } from 'src/util/pipes/validation.pipe';
import { postSchema } from 'src/util/schemas/postDto.schema';
import { FormPost } from 'src/util/decorators/post.decorator';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('/upload')
    @UseInterceptors(FilesInterceptor('files'))
    async upload(@FormPost(new ValidationPipe(postSchema)) data) {
        // try {
        //     await this.usersService.saveUser(modelData.name, modelData.email, modelData.birthday, modelData.password);
        //     await this.usersService.saveFile(modelData.email, files);
        // } catch(err) {
        //     return `${err}`
        // }
        //console.log(files)

        // files.forEach(file => {
        //     let filename = `${file.originalname.split('.')[0]}`+
        //          `-${new Date().toISOString().replace(/:/g, '-')}.${file.originalname.split('.')[1]}`
        //     fs.writeFile(path.join(__dirname, `../../uploads/${filename}`), file.buffer, () => {})
        // })
        return {body: data}
    }
}
