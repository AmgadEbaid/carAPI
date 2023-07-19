import { IsBoolean } from 'class-validator';

export class approveReport {
  @IsBoolean()
  approved: boolean;
}
