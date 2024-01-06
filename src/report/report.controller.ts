import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get('/')
  async getAllReport() {
    return await this.reportService.getAllReport();
  }

  @Get('/:uid/')
  async getReportOfUser(@Param('uid') uid: string) {
    return await this.reportService.getReportOfUser(uid);
  }

  @Get('/:uid/:status/')
  async getReportOfUserByStatus(
    @Param('uid') uid: string,
    @Param('status') status: boolean,
  ) {
    return await this.reportService.getReportOfUserByStatus(uid, status);
  }

  @Post('/')
  async createReport(
    @Body('user_id') uid: string,
    @Body('quiz_id') qid: string,
    @Body('detail') detail: string,
  ) {
    return await this.reportService.createReport(uid, qid, detail);
  }

  @Patch('/:vid/')
  async updateReportStatus(@Param('vid') vid: string) {
    return await this.reportService.updateReportStatus(vid);
  }

  @Delete('/:vid/')
  async deleteOneReport(@Param('vid') vid: string) {
    return await this.reportService.deleteOneReport(vid);
  }

  @Delete('/:uid/')
  async deleteUserReport(@Param('uid') uid: string) {
    return await this.reportService.deleteUserReport(uid);
  }
}
