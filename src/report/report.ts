import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Report {
    @PrimaryColumn()
    vio_id: string;

    @Column()
    user_id: string;

    @Column()
    quiz_id: string;

    @Column()
    detail: string;

    @Column({default: false})
    is_resolved: boolean;
}
