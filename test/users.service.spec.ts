import { Test, TestingModule } from '@nestjs/testing'

import { User } from '../src/users/data/models/user.model'
import { UserRepository } from '../src/users/data/repositories/users.repository'
import { FileService } from '../src/users/service/file.service'
import { UsersService } from '../src/users/service/users.service'


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

const UserRepositoryMock = jest.fn(() => ({
    save: jest.fn((user: User) => user),
    findByEmail: jest.fn((email: string) => new User('Jane Doe', 'whatever@gmail.com', new Date('12/12/2000')))
}))

let usersService: UsersService
let fileService: FileService
let userRepository: UserRepository

beforeEach(async () => {
    
    const FileServiceProvider = {
        provide: FileService,
        useClass: FileServiceMock
    }
    const UserRepositoryProvider = {
        provide: UserRepository,
        useClass: UserRepositoryMock
    }
    const module: TestingModule = await Test.createTestingModule({
        providers: [
            UsersService,
            FileServiceProvider,
            UserRepositoryProvider
        ]
    }).compile()
    usersService = module.get<UsersService>(UsersService)
    fileService = module.get<FileService>(FileService)
    userRepository = module.get<UserRepository>(UserRepository)
})

it('usersService should be defined', () => {
    expect(usersService).toBeDefined()
})

it('fileService should be defined', () => {
    expect(fileService).toBeDefined()
})

it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined()
})

it('should save user to db', async () => {
    const jane = new User('Jane Doe', 'whatever@gmail.com', new Date('12/12/2000'))
    const result = await usersService.saveUser(jane.name, jane.email, jane.birthday.toString(), 'pa$$word')
    expect(result).toEqual(jane)
})

it('should process files from request', async () => {
    let files: Array<Express.Multer.File> = [
        {fieldname: 'files', originalname: 'file1.pdf', encoding: '7bit', mimetype:'application/pdf', buffer: null, size: 200, stream: null, destination:'', filename:'file1.pdf', path:''},
        {fieldname: 'files', originalname: 'file2.pdf', encoding: '7bit', mimetype:'application/pdf', buffer: null, size: 200, stream: null, destination:'', filename:'file2.pdf', path:''},
        {fieldname: 'files', originalname: 'file3.pdf', encoding: '7bit', mimetype:'application/pdf', buffer: null, size: 200, stream: null, destination:'', filename:'file3.pdf', path:''}
    ]
    await usersService.saveFile('whatever@gmail.com', files)
    expect(fileService.saveFileToFS).toBeCalledTimes(3) 
    expect(fileService.saveFileToDB).toBeCalledTimes(3)
})
