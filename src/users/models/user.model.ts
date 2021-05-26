import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import bcrypt from 'bcryptjs';

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
  
  public constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  public async hashPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
  }
}