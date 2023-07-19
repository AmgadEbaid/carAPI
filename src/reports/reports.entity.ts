import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { user } from 'src/users/user.entity';
@Entity()
export class reports {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  make: string;

  @Column({ default: false })
  approved: boolean;

  @Column()
  modle: string;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  milnumber: number;

  @Column()
  price: number;

  @ManyToOne(() => user, (User) => User.reports)
  user: user;
}
