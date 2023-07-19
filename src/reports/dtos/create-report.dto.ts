import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLatitude,
  IsLongitude,
} from 'class-validator';

export class createReportsDto {
  @IsString()
  make: string;

  @IsString()
  modle: string;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @IsNumber()
  @Min(0)
  @Max(100000)
  milnumber: number;

  @IsNumber()
  @Min(0)
  @Max(100000)
  price: number;
}
