import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { Transform } from 'class-transformer';
export class EstmateReportDto {
  @IsString()
  make: string;

  @IsString()
  modle: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;
  @Transform(({ value }) => parseInt(value))
  @IsLongitude()
  lng: number;
  @Transform(({ value }) => parseInt(value))
  @IsLatitude()
  lat: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(100000)
  milnumber: number;
}
