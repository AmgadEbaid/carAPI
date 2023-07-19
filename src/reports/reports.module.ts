import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { reports } from './reports.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([reports])],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule { }
