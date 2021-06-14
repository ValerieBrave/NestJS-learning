import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { File } from "./file.model";

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;
  
  @Column({ nullable: true, type: 'date' })
  birthday: Date;

  @Column('varchar')
  password: string;

  @OneToMany(() => File, file => file.user)
  files: File;

  
  public constructor(name: string, email: string, birthday: Date) {
    this.name = name;
    this.email = email;
    this.birthday = birthday;
  }

  public async hashPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
  }
}