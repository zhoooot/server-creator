import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepo: Repository<Report>,
  ) {}

  getAllReport(): Promise<Report[]> {
    return this.reportRepo.find({
      select: {
        vio_id: true,
        user_id: true,
        quiz_id: true,
        detail: true,
        is_resolved: true,
      },
    });
  }

  getReportOfUser(id: string): Promise<Report[]> {
    return this.reportRepo.find({
      select: {
        vio_id: true,
        quiz_id: true,
        detail: true,
        is_resolved: true,
      },
      where: {
        user_id: id,
      },
    });
  }

  getReportOfUserByStatus(uid: string, status: boolean): Promise<Report[]> {
    return this.reportRepo.find({
      select: {
        vio_id: true,
        quiz_id: true,
        detail: true,
      },
      where: {
        user_id: uid,
        is_resolved: status,
      },
    });
  }

  createReport(uid: string, qid: string, detail: string): Promise<Report> {
    const report = new Report();
    report.vio_id = 'RANDOM REPORT';
    report.user_id = uid;
    report.quiz_id = qid;
    report.detail = detail;
    return this.reportRepo.save(report);
  }

  async updateReportStatus(vid: string): Promise<Report> {
    const report = await this.reportRepo.findOne({
      where: {
        vio_id: vid,
      },
    });
    report.is_resolved = true;
    return this.reportRepo.save(report);
  }

  async deleteOneReport(vid: string): Promise<Report> {
    const report = await this.reportRepo.findOne({
      where: {
        vio_id: vid,
      },
    });
    await this.reportRepo.delete(report);
    return report;
  }

  async deleteUserReport(uid: string): Promise<Report[]> {
    const reports = await this.reportRepo.find({
      where: {
        user_id: uid,
      },
    });
    for (const report of reports) {
      await this.reportRepo.delete(report);
    }
    return reports;
  }
}
