import { Test, TestingModule } from '@nestjs/testing'
import { File } from '../src/users/data/models/file.model'
import { User } from '../src/users/data/models/user.model'
import { UserRepository } from '../src/users/data/repositories/users.repository'
import { FileService } from '../src/users/service/file.service'
import { UsersService } from '../src/users/service/users.service'


class FileServiceMock {
    saveFileToDB(userId: number, file: Express.Multer.File) : File {
        return {
            id: 1,
            user: 1,
            path: 'D:\\somepath',
            fileName: 'somefile.pdf'
        }
    };

    saveFileToFS(path: string, file: Express.Multer.File) {};
}

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

it('usersService shoul be defined', () => {
    expect(usersService).toBeDefined()
})

it('fileService shoul be defined', () => {
    expect(fileService).toBeDefined()
})

it('userRepository shoul be defined', () => {
    expect(userRepository).toBeDefined()
})

it('should save user to db', async () => {
    const jane = new User('Jane Doe', 'whatever@gmail.com', new Date('12/12/2000'))
    const result = await usersService.saveUser(jane.name, jane.email, jane.birthday.toString(), 'pa$$word')
    expect(result).toEqual(jane)
})