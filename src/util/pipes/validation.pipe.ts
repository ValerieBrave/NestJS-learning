import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ObjectSchema } from "joi";

import { PostDto } from "../../users/presentation/dto/post.dto";


@Injectable()
export class ValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}
    transform(value: PostDto, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value);
        if (error && metadata.type === 'body')  {
            console.log(`VALIDATION PIPE ${error}`)
            throw new BadRequestException(`${error}`);
        }
        return value;
    }
}