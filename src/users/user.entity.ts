import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { reports } from 'src/reports/reports.entity';
@Entity()
export class user {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: false })
  admin: Boolean;

  @OneToMany(() => reports, (reports) => reports.user)
  reports: reports[];
}
