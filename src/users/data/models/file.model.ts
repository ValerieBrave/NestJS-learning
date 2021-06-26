import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class File {
    @ApiProperty({ example: 1, description: 'Identificator of the file' })
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.id)
    user: number;

    @ApiProperty({ example: 'D://example_dir', description: 'Path to the directory with the file' })
    @Column('varchar')
    path: string;

    @ApiProperty({ example: 'example_file.pdf', description: 'Name of the file' })
    @Column('varchar')
    fileName: string;

    public constructor(userId: number, path: string, filename: string) {
        this.user = userId;
        this.path = path;
        this.fileName = filename;
    }
}