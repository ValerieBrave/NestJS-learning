import { Body, ClassSerializerInterceptor, Controller, Post, Req, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PostDto } from './dto/post.dto';
import { UsersService } from '../service/users.service';
import ValidationPost from 'src/util/decorators/validationpost.decorator';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClientPostDto } from './dto/clientPost.dto';
import { User } from '../data/models/user.model';
import { PostLogger } from 'src/util/logging/post.logger';


@Controller('users')
export class UsersController {
    private logger : PostLogger;
    constructor(private usersService: UsersService) {
        this.logger = new PostLogger(UsersController.name)
        this.logger.verbose('UserController created')
    }
    
    @ValidationPost()
    @Post('/upload')
    @UseInterceptors(FilesInterceptor('files'))
    @ApiOperation({ summary: 'Post user info and files' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({type: ClientPostDto})
    @ApiResponse({ status: 201, description: 'Created', type: User})
    @ApiResponse({ status: 400, description: 'Bad Request' })

    async upload(@Body('data') modelData: PostDto, @UploadedFiles() files: Array<Express.Multer.File>)   {
        try {
            
            const user: User = await this.usersService.saveUser(modelData.name, modelData.email, modelData.birthday, modelData.password);
            await this.usersService.saveFile(modelData.email, files);
            
            return user
        } catch(err) {
            throw err
        }
    }
}
