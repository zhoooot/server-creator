import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Creator } from './creator';
import { Repository } from 'typeorm';

@Injectable()
export class CreatorService {
  constructor(
    @InjectRepository(Creator)
    private usersRepository: Repository<Creator>,
  ) {}

  async createACreator(
    fullname: string,
    phone: string,
    institution: string,
  ): Promise<Creator> {
    const new_user = new Creator();
    new_user.fullname = fullname;
    new_user.phone = phone;
    new_user.institution = institution;
    await this.usersRepository.save(new_user);
    return new_user;
  }

  async getAllCreators(): Promise<Creator[]> {
    return await this.usersRepository.find({
      select: {
        id: true,
        fullname: true,
        phone: true,
        institution: true,
      },
    });
  }

  async updateCreator(
    id: string,
    fullname: string,
    phone: string,
    institution: string,
  ): Promise<Creator> {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
    user.fullname = fullname;
    user.phone = phone;
    user.institution = institution;
    await this.usersRepository.save(user);
    return user;
  }

  async deleteCreator(id: string): Promise<Creator> {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.usersRepository.delete(id);
    return user;
  }
}
