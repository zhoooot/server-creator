import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Creator } from './creator';
import { Repository } from 'typeorm';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class CreatorService {
  constructor(
    @InjectRepository(Creator)
    private usersRepository: Repository<Creator>,
    private amqpConnection: AmqpConnection,
  ) {}

  @RabbitSubscribe({
    exchange: 'user',
    routingKey: 'user.register',
    queue: 'creator',
  })
  async createCreator(creator: { id: string }): Promise<Creator> {
    const { id } = creator;
    const new_user = new Creator();
    new_user.id = id;
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

    this.amqpConnection.publish('user', 'user.delete', {
      id: id,
    });

    return user;
  }
}
