import { UsePipes } from '@nestjs/common';

import { ValidationPipe } from '../pipes/validation.pipe';
import { postSchema } from '../schemas/postDto.schema';
import { TranformationPipe } from '../pipes/transform.pipe';

function ValidationPost() {
    return UsePipes(TranformationPipe, new ValidationPipe(postSchema))
}

export default ValidationPost