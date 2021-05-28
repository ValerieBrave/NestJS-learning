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

    public constructor(jobId: number, path: string, filename: string) {
        this.jobId = jobId;
        this.path = path;
        this.fileName = filename;
    }
}