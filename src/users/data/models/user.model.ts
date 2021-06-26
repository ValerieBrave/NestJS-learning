import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { File } from "./file.model";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Valeria Smelova', description: 'User name' })
  @Column('varchar')
  name: string;

  @ApiProperty({ example: 'valeriebrave00@gmail.com', description: 'User email' })
  @Column('varchar')
  email: string;
  
  @ApiProperty({ example: '12/02/2000', description: 'User date of birth' })
  @Column({ nullable: true, type: 'date' })
  birthday: Date;

  @ApiProperty({ example: '$uper_$ecret', description: 'User password' })
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