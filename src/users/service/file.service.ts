import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileRepository } from "src/users/data/repositories/files.repository";
import * as path from 'path';
import * as fs from 'fs';
import * as streamifier from 'streamifier';
import { File } from '../data/models/file.model';


export class FileService {
    constructor(
        @InjectRepository(File)
        private fileRepository: FileRepository
    ) {}

    saveFileToDB(userId: number, file: Express.Multer.File) : Promise<File> {
        return  this.fileRepository.save(new File(userId, path.join('D://NestJS//nest-learning//uploads', file.originalname), file.originalname))
    }

    async saveFileToFS(path: string, file: Express.Multer.File) : Promise<void> {
        const writeableStream = fs.createWriteStream(path);
        streamifier.createReadStream(file.buffer).pipe(writeableStream);
    }
}