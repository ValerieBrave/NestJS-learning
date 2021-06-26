import { ApiProperty } from "@nestjs/swagger";
import { PostDto } from "./post.dto";

export class ClientPostDto {
    @ApiProperty({ description: 'User info' })
    readonly  data: PostDto;
    @ApiProperty({ description: 'Attached files' })
    readonly files: Array<Express.Multer.File>;
}