import { Expose, Transform } from 'class-transformer';
import { user } from 'src/users/user.entity';
export class reportDto {
  @Expose()
  id: number;
  @Expose()
  approved: boolean;
  @Expose()
  make: string;
  @Expose()
  modle: string;
  @Expose()
  year: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  milnumber: number;
  @Expose()
  price: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
