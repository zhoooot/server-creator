import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Creator {
  @PrimaryColumn()
  id: string;

  @Column({ default: '' })
  fullname: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: '' })
  institution: string;

  constructor(
    id?: string,
    fullname?: string,
    phone?: string,
    institution?: string,
  ) {
    this.id = id;
    this.fullname = fullname;
    this.phone = phone;
    this.institution = institution;
  }
}
