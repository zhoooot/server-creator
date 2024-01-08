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
import { Creator } from './creator';

@Controller('creator')
export class CreatorController {
  constructor(private creatorService: CreatorService) {}

  @Get('/')
  async get_all_creator() {
    return await this.creatorService.getAllCreators();
  }

  @Get('/:id/')
  async get_creator(@Param('id') id: string) {
    return await this.creatorService.getCreator(id);
  }

  @Post('/')
  async create_creator(
    @Body('id') id: string,
    @Body('fullname') fullname: string,
    @Body('phone') phone: string,
    @Body('institution') institution: string,
  ) {
    console.log(fullname);
    console.log(phone);
    console.log(institution);
    const creator = new Creator(id, fullname, phone, institution);
    return await this.creatorService.createCreator(creator);
  }

  @Put('/:id/')
  async updateCreator(
    @Param('id') id: string,
    @Body('fullname') fullname: string,
    @Body('phone') phone: string,
    @Body('institution') institution: string,
  ) {
    const creator = new Creator(id, fullname, phone, institution);
    return await this.creatorService.updateCreator(creator);
  }

  @Delete('/:id/')
  async deleteCreator(@Param('id') id: string) {
    return await this.creatorService.deleteCreator(id);
  }
}
