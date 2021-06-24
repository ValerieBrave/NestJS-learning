import { Body, Controller, Post, Req, Res, UploadedFile, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response, Request, response } from 'express';
import { PostDto } from './dto/post.dto';
import { diskStorage } from 'multer';
import { UsersService } from '../service/users.service';
import { Stream } from 'stream';
import * as fs from 'fs';

import * as path from 'path';
import { ValidationPipe } from 'src/util/pipes/validation.pipe';
import { postSchema } from 'src/util/schemas/postDto.schema';
import { FormPost } from 'src/util/decorators/post.decorator';
import ValidationPost from 'src/util/decorators/validationpost.decorator';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    
    @ValidationPost()
    @Post('/upload')
    @UseInterceptors(FilesInterceptor('files'))
    async upload(@Body('data') modelData: PostDto, @UploadedFiles() files: Array<Express.Multer.File>) {
        try {
            await this.usersService.saveUser(modelData.name, modelData.email, modelData.birthday, modelData.password);
            await this.usersService.saveFile(modelData.email, files);
            return 'all ok'
        } catch(err) {
            return `${err}`
        }
    }
}
