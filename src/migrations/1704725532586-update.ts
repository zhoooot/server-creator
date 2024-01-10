import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1704725532586 implements MigrationInterface {
    name = 'Update1704725532586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "creator" ("id" character varying NOT NULL, "fullname" character varying NOT NULL DEFAULT '', "phone" character varying NOT NULL DEFAULT '', "institution" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_43e489c9896f9eb32f7a0b912c2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "creator"`);
    }

}
