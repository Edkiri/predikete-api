import { MigrationInterface, QueryRunner } from "typeorm";

export class init1661174384542 implements MigrationInterface {
    name = 'init1661174384542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "about" character varying(100), "picture" character varying(255), CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "picture" character varying(255), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_invitation" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "message" character varying(255), "issued_by_id" integer, "issued_to_id" integer, "group_id" integer, CONSTRAINT "PK_355b6961ab356c14344bf323764" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Role" AS ENUM('admin', 'client')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "display_name" character varying(20) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."Role" NOT NULL DEFAULT 'client', "profile_id" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_f44d0cd18cfd80b0fed7806c3b" UNIQUE ("profile_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "membership" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_admin" boolean NOT NULL DEFAULT false, "user_id" integer, "group_id" integer, CONSTRAINT "PK_83c1afebef3059472e7c37e8de8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d7b446f7f7f75e661fce14a25f" ON "membership" ("group_id") `);
        await queryRunner.query(`CREATE TABLE "group_access_request" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "message" character varying(255), "issued_by" integer, "group_id" integer, CONSTRAINT "PK_b457d04011fb56468b0d61c8b40" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "group_invitation" ADD CONSTRAINT "FK_e0891bfee39220e03c06cd64158" FOREIGN KEY ("issued_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_invitation" ADD CONSTRAINT "FK_19d894db6fdb14900e05516a4a0" FOREIGN KEY ("issued_to_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_invitation" ADD CONSTRAINT "FK_eb10d33ede2fa8dce934492c5a7" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "membership" ADD CONSTRAINT "FK_e9c72e8d29784031c96f5c6af8d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "membership" ADD CONSTRAINT "FK_d7b446f7f7f75e661fce14a25f0" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_access_request" ADD CONSTRAINT "FK_2ade771645d0af79512e54818a0" FOREIGN KEY ("issued_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_access_request" ADD CONSTRAINT "FK_2e988dc40f3847bcb27dd280c06" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_access_request" DROP CONSTRAINT "FK_2e988dc40f3847bcb27dd280c06"`);
        await queryRunner.query(`ALTER TABLE "group_access_request" DROP CONSTRAINT "FK_2ade771645d0af79512e54818a0"`);
        await queryRunner.query(`ALTER TABLE "membership" DROP CONSTRAINT "FK_d7b446f7f7f75e661fce14a25f0"`);
        await queryRunner.query(`ALTER TABLE "membership" DROP CONSTRAINT "FK_e9c72e8d29784031c96f5c6af8d"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7"`);
        await queryRunner.query(`ALTER TABLE "group_invitation" DROP CONSTRAINT "FK_eb10d33ede2fa8dce934492c5a7"`);
        await queryRunner.query(`ALTER TABLE "group_invitation" DROP CONSTRAINT "FK_19d894db6fdb14900e05516a4a0"`);
        await queryRunner.query(`ALTER TABLE "group_invitation" DROP CONSTRAINT "FK_e0891bfee39220e03c06cd64158"`);
        await queryRunner.query(`DROP TABLE "group_access_request"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d7b446f7f7f75e661fce14a25f"`);
        await queryRunner.query(`DROP TABLE "membership"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."Role"`);
        await queryRunner.query(`DROP TABLE "group_invitation"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "group"`);
    }

}
