import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1704536112933 implements MigrationInterface {
    name = 'Init1704536112933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`creator\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullname\` varchar(255) NOT NULL DEFAULT '', \`phone\` varchar(255) NOT NULL DEFAULT '', \`institution\` varchar(255) NOT NULL DEFAULT '', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`report\` (\`vio_id\` varchar(255) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`quiz_id\` varchar(255) NOT NULL, \`detail\` varchar(255) NOT NULL, \`is_resolved\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`vio_id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`report\``);
        await queryRunner.query(`DROP TABLE \`creator\``);
    }

}
