import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import { Test } from "@nestjs/testing";

import { UsersModule } from "../src/users/users.module";
import { UsersService } from "../src/users/service/users.service";
import { FileService } from "../src/users/service/file.service";
import { User } from "../src/users/data/models/user.model";
import { UserRepository } from "../src/users/data/repositories/users.repository";
import { FileRepository } from "../src/users/data/repositories/files.repository";

const TypeOrmModuleMock = jest.fn(() => ({

}))

const UsersServiceMock = jest.fn(() => ({
    saveUser: jest.fn((name: string, email: string, birthday: string, password: string) => {
        console.log(`user ${name} created`)
        return {
            name: name,
            email: email, 
            birthday: new Date(birthday),
            password: password
        }
    }),
    saveFile: jest.fn((email: string, files: Array<Express.Multer.File>) => {
        console.log(`files saved to DB and FS`)
    })
}))
const UserRepositoryMock = jest.fn(() => ({
    save: jest.fn((user: User) => user),
    findByEmail: jest.fn((email: string) => new User('Jane Doe', 'whatever@gmail.com', new Date('12/12/2000')))
}))

const FileServiceMock = jest.fn(() => ({
    saveFileToDB: jest.fn((userId: number, file: Express.Multer.File) => {
        console.log(`file ${file.filename} saved to DB`)
        return {
                    id: 1,
                    user: userId,
                    path: `D:\\somepath\\${file.originalname}`,
                    fileName: file.originalname
                }
    }),
    saveFileToFS: jest.fn((path: string, file: Express.Multer.File) => {
        console.log(`file ${file.filename} saved to FS`)
    })
}))
const FileRepositoryMock = jest.fn()

describe('UsersController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({imports: [UsersModule]})
        .overrideProvider(UsersService)
        .useClass(UsersServiceMock)
        .overrideProvider(FileService)
        .useClass(FileServiceMock)
        .overrideProvider(UserRepository)
        .useClass(UserRepositoryMock)
        .overrideProvider(FileRepository)
        .useClass(FileRepositoryMock)
        .compile();


        app = moduleRef.createNestApplication();
        await app.init();
    })
    
    it('POST /users/upload', () => {
        return request(app.getHttpServer())
        .post('/users/upload')
        .set('Content-Type', 'multipart/form-data')
        .field('data', JSON.stringify({name: 'Jane Doe', email: 'whatever@gmail.com', birthday: '11/22/2000', password: 'password1'}))
        .attach('files','D:\\NestJS\\NestJS-learning\\uploads\\Main.pdf')
        .expect(201)
        .expect({
            name: 'Jane Doe',
            email: 'whatever@gmail.com', 
            birthday: new Date('11/22/2000').toISOString(),
            password: 'password1'
        })
    })

    it('POST /users/upload', () => {
        return request(app.getHttpServer())
        .post('/users/upload')
        .set('Content-Type', 'multipart/form-data')
        .field('data', JSON.stringify({name: 'Jane Doe', email: 'whatevergmail.com', birthday: '11/22/2000', password: 'pa'}))
        .attach('files','D:\\NestJS\\NestJS-learning\\uploads\\Main.pdf')
        .expect(400)
    })

    afterAll(async () => {
        await app.close();
    });
    
})