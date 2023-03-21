import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1679387612376 implements MigrationInterface {
    name = 'InitDatabase1679387612376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`status\` enum ('ACTIVE', 'IN_ACTIVE') NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`status\` varchar(255) NOT NULL`);
    }

}
