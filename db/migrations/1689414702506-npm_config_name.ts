import { MigrationInterface, QueryRunner } from "typeorm";

export class NpmConfigName1689414702506 implements MigrationInterface {
    name = 'NpmConfigName1689414702506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (0))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password", "admin") SELECT "id", "email", "password", "admin" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "firstname" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (0))`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password", "admin") SELECT "id", "email", "password", "admin" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
