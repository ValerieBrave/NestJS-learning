import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";

import { PostDto } from "../../users/presentation/dto/post.dto";

@Injectable()
export class TranformationPipe implements PipeTransform<string, PostDto> {
    transform(value: string, metadata: ArgumentMetadata) {
        try {
            if(metadata.type === 'body') {
                const parsedData = value ? JSON.parse(value) : ({} as PostDto);
                if(this.isEmpty(parsedData)) 
                throw new HttpException(
                    `Validation failed: no payload provided`,
                    HttpStatus.BAD_REQUEST,
                );
                return parsedData;
            } else return value
        } catch(err) {
            console.log(`TRANSFORM PIPE ${err}`)
            throw new HttpException(
                `Validation failed: ${err.message}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    private isEmpty(value: PostDto): boolean {
        return !Object.keys(value).length;
    }
}