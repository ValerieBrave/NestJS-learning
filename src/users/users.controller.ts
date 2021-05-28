import { Body, Controller, Post, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response, Request, response } from 'express';
import { PostDto } from './dto/post.dto';
import { diskStorage } from 'multer';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('/upload')
    @UseInterceptors(FilesInterceptor('files', 10, {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, files, cb) => {
                let filename = `${files.originalname.split('.')[0]}`+
                `-${new Date().toISOString().replace(/:/g, '-')}.${files.originalname.split('.')[1]}`
                cb(null, filename)
            }
        })
    }))
    async upload(@UploadedFiles() files: Array<Express.Multer.File>, @Body() modelData: PostDto) {
        console.log(__dirname)
        try {
            await this.usersService.saveUser(modelData.name, modelData.email, modelData.birthday, modelData.password);
            await this.usersService.saveFile(modelData.jobId, files);
        } catch(err) {
            return `${err}`
        }
        
        return `user saved all ok`
    }
}
