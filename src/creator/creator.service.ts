import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Creator } from './creator';
import { Repository } from 'typeorm';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { USER_EXCHANGE_NAME, USER_ROUTING_KEY } from 'src/config';

@Injectable()
export class CreatorService {
  constructor(
    @InjectRepository(Creator)
    private usersRepository: Repository<Creator>,
  ) {}

  @RabbitSubscribe({
    exchange: USER_EXCHANGE_NAME,
    routingKey: USER_ROUTING_KEY,
    queue: 'user-create',
    queueOptions: {
      durable: true,
    },
  })
  async createCreator(creator: Creator): Promise<Creator> {
    const { id, fullname, institution, phone } = creator;
    const new_user = new Creator();
    new_user.id = id;
    new_user.fullname = fullname;
    new_user.phone = phone;
    new_user.institution = institution;
    await this.usersRepository.save(new_user);
    return new_user;
  }

  getCreator(id: string) {
    return this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
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

  async updateCreator(creator: Creator): Promise<Creator> {
    const { id, fullname, institution, phone } = creator;
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
