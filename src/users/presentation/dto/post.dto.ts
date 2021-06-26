import { ApiProperty } from "@nestjs/swagger";

export class PostDto {
    @ApiProperty({ example: 'Valeria Smelova', description: 'Users name' })
    readonly name: string;
    @ApiProperty({ example: 'valeriebrave00@gmail.com', description: 'Users email' })
    readonly email: string;
    @ApiProperty({ example: '12/02/2000', description: 'Users date of birth' })
    readonly birthday: string;  //passed as string from postman
    @ApiProperty({ example: '$ecret_pa$s', description: 'Users password' })
    readonly password: string;
}