import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Query,
  Get,
} from '@nestjs/common';
import { createReportsDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGard } from 'src/gards/auth.gards';
import { CurentUser } from 'src/users/current user decorator';
import { user } from 'src/users/user.entity';
import { reportDto } from './dtos/report.dto';
import { serialzer } from '../interseptors/serilizer.interseptors';
import { approveReport } from './dtos/approveReport.dto';
import { AdminGard } from 'src/gards/admin.gard';
import { EstmateReportDto } from './dtos/estmateReport.dto';
@Controller('r')
export class ReportsController {
  constructor(private ReportsService: ReportsService) {}

  @Post('rc')
  @UseGuards(AuthGard)
  @serialzer(reportDto)
  createReport(@Body() Body: createReportsDto, @CurentUser() user: user) {
    return this.ReportsService.createReport(Body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGard)
  aprroveReport(@Param('id') id: string, @Body() Body: approveReport) {
    return this.ReportsService.changeApproveal(id, Body.approved);
  }
  @Get()
  esmateReports(@Query() body: EstmateReportDto) {
    return this.ReportsService.createEstimate(body);
  }
}
