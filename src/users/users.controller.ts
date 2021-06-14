import { Body, Controller, Post, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response, Request, response } from 'express';
import { PostDto } from './dto/post.dto';
import { diskStorage } from 'multer';
import { UsersService } from './users.service';
import { Stream } from 'stream';
import * as fs from 'fs';
import * as streamifier from 'streamifier';
import * as path from 'path';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('/upload')
    // @UseInterceptors(FilesInterceptor('files', 10, {
    //     storage: diskStorage({
    //         destination: './uploads',
    //         filename: (req, files, cb) => {
    //             let filename = `${files.originalname.split('.')[0]}`+
    //             `-${new Date().toISOString().replace(/:/g, '-')}.${files.originalname.split('.')[1]}`
    //             cb(null, filename)
    //         }
    //     })
    // }))
    @UseInterceptors(FilesInterceptor('files'))
    async upload(@UploadedFiles() files: Array<Express.Multer.File>, @Body() modelData: PostDto) {
        
        // try {
        //     await this.usersService.saveUser(modelData.name, modelData.email, modelData.birthday, modelData.password);
        //     await this.usersService.saveFile(modelData.email, files);
        // } catch(err) {
        //     return `${err}`
        // }
        //console.log(files)

        //options:
        //fs ----?
        //stream for each file ---?
        
        files.forEach(file => {
            let filename = `${file.originalname.split('.')[0]}`+
                 `-${new Date().toISOString().replace(/:/g, '-')}.${file.originalname.split('.')[1]}`
            fs.writeFile(path.join(__dirname, `../../uploads/${filename}`), file.buffer, () => {})
        })
        return files
    }
}
