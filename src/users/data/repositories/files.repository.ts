import { EntityRepository, Repository } from "typeorm";
import { File } from "../models/file.model";

@EntityRepository(File)
export class FileRepository extends Repository<File> {
    
}