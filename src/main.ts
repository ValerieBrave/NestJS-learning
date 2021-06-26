import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { PostLogger } from './util/logging/post.logger';



async function bootstrap() {
  const PORT = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Posting user info and files')
    .setDescription('NestJS learning project')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  app.useLogger(app.get(PostLogger))

  await app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});
}
bootstrap();
