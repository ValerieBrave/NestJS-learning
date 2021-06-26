import { InjectRepository } from "@nestjs/typeorm";
import * as path from 'path';
import * as fs from 'fs';
import * as streamifier from 'streamifier';

import { File } from '../data/models/file.model';
import { FileRepository } from "../data/repositories/files.repository";
import { PostLogger } from "src/util/logging/post.logger";
import { COLORS } from "src/util/logging/colors";

export class FileService {
    private logger : PostLogger;
    constructor(
        @InjectRepository(File)
        private fileRepository: FileRepository
    ) {
        this.logger = new PostLogger(FileService.name);
    }

    async saveFileToDB(userId: number, file: Express.Multer.File) : Promise<File> {
        const saved =  await this.fileRepository.save(new File(userId, path.join('D://NestJS//nest-learning//uploads', file.originalname), file.originalname));
        this.logger.write(`File ${file.originalname} saved to DB`, COLORS.GREEN);
        return saved;
    }

    async saveFileToFS(path: string, file: Express.Multer.File) : Promise<void> {
        const writeableStream = fs.createWriteStream(path);
        streamifier.createReadStream(file.buffer).pipe(writeableStream);
        this.logger.write(`File ${file.originalname} saved to disk`, COLORS.GREEN);
    }
}