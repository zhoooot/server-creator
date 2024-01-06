import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Creator {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: '' })
  fullname: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: '' })
  institution: string;
}
