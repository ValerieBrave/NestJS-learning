import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    jobId: number;
    
    @Column('varchar')
    path: string;

    @Column('varchar')
    fileName: string;
}