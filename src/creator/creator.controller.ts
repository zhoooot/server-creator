import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatorService } from './creator.service';

@Controller('creator')
export class CreatorController {
  constructor(private creatorService: CreatorService) {}

  @Get('/')
  async get_all_creator() {
    return await this.creatorService.getAllCreators();
  }

  @Post('/')
  async create_creator(
    @Body('fullname') fullname: string,
    @Body('phone') phone: string,
    @Body('institution') institution: string,
  ) {
    console.log(fullname);
    console.log(phone);
    console.log(institution);
    return await this.creatorService.createACreator(
      fullname,
      phone,
      institution,
    );
  }

  @Put('/:id/')
  async updateCreator(
    @Param('id') id: string,
    @Body('fullname') fullname: string,
    @Body('phone') phone: string,
    @Body('institution') institution: string,
  ) {
    return await this.creatorService.updateCreator(
      id,
      fullname,
      phone,
      institution,
    );
  }

  @Delete('/:id/')
  async deleteCreator(@Param('id') id: string) {
    return await this.creatorService.deleteCreator(id);
  }
}
