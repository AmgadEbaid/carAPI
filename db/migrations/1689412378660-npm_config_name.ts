import { MigrationInterface, QueryRunner } from "typeorm";

export class NpmConfigName1689412378660 implements MigrationInterface {
    name = 'NpmConfigName1689412378660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "firstname" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (0))`);
        await queryRunner.query(`CREATE TABLE "reports" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "make" varchar NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "modle" varchar NOT NULL, "year" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "milnumber" integer NOT NULL, "price" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_reports" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "make" varchar NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "modle" varchar NOT NULL, "year" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "milnumber" integer NOT NULL, "price" integer NOT NULL, "userId" integer, CONSTRAINT "FK_bed415cd29716cd707e9cb3c09c" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_reports"("id", "make", "approved", "modle", "year", "lng", "lat", "milnumber", "price", "userId") SELECT "id", "make", "approved", "modle", "year", "lng", "lat", "milnumber", "price", "userId" FROM "reports"`);
        await queryRunner.query(`DROP TABLE "reports"`);
        await queryRunner.query(`ALTER TABLE "temporary_reports" RENAME TO "reports"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reports" RENAME TO "temporary_reports"`);
        await queryRunner.query(`CREATE TABLE "reports" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "make" varchar NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "modle" varchar NOT NULL, "year" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "milnumber" integer NOT NULL, "price" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "reports"("id", "make", "approved", "modle", "year", "lng", "lat", "milnumber", "price", "userId") SELECT "id", "make", "approved", "modle", "year", "lng", "lat", "milnumber", "price", "userId" FROM "temporary_reports"`);
        await queryRunner.query(`DROP TABLE "temporary_reports"`);
        await queryRunner.query(`DROP TABLE "reports"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
