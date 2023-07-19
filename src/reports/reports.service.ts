import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { reports } from './reports.entity';
import { createReportsDto } from './dtos/create-report.dto';
import { EstmateReportDto } from './dtos/estmateReport.dto';
@Injectable()
export class ReportsService {
  constructor(@InjectRepository(reports) private repo: Repository<reports>) {}

  createReport(reportDto: createReportsDto, user) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproveal(id: string, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: +id } });
    if (!report) {
      throw new NotFoundException('reopot not found ');
    }
    report.approved = approved;
    return this.repo.save(report);
  }

  createEstimate({ year, lat, lng, make, modle, milnumber }: EstmateReportDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make=:make', { make })
      .andWhere('year-:year BETWEEN -5 AND 5 ', { year })
      .andWhere('modle=:modle', { modle })
      .andWhere('lat-:lat BETWEEN -5 AND 5', { lat })
      .andWhere('lng-:lng BETWEEN -5 AND 5 ', { lng })
      .andWhere('approved IS TRUE')
      .orderBy('milnumber', 'DESC')
      .getRawMany();
  }
}
