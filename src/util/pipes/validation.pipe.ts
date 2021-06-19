import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ArraySchema, ObjectSchema } from "joi";


@Injectable()
export class ValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}
    transform(value: any, metadata: ArgumentMetadata) {
        console.log(value)
        const { error } = this.schema.validate(value);
        if (error)  throw new BadRequestException(`${error}`);
        return value;
    }
}