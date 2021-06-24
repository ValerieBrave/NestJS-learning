import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.id)
    user: number;
    
    @Column('varchar')
    path: string;

    @Column('varchar')
    fileName: string;

    public constructor(userId: number, path: string, filename: string) {
        this.user = userId;
        this.path = path;
        this.fileName = filename;
    }
}