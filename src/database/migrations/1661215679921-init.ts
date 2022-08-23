import { MigrationInterface, QueryRunner } from "typeorm";

export class init1661215679921 implements MigrationInterface {
    name = 'init1661215679921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_profile" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "picture" character varying(255), CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "about" character varying(100), "picture" character varying(255), CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_membership" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_admin" boolean NOT NULL DEFAULT false, "user_id" integer, "group_id" integer, CONSTRAINT "PK_b631623cf04fa74513b975e7059" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7a1166a6e3a6a3431a69925771" ON "group_membership" ("group_id") `);
        await queryRunner.query(`CREATE TABLE "group_invitation" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "message" character varying(255), "issued_by_id" integer, "issued_to_id" integer, "group_id" integer, CONSTRAINT "PK_355b6961ab356c14344bf323764" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Role" AS ENUM('admin', 'client')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "display_name" character varying(20) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."Role" NOT NULL DEFAULT 'client', "profile_id" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_f44d0cd18cfd80b0fed7806c3b" UNIQUE ("profile_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_access_request" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "message" character varying(255), "issued_by" integer, "group_id" integer, CONSTRAINT "PK_b457d04011fb56468b0d61c8b40" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tournament_team" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "image" character varying, CONSTRAINT "UQ_88a7b53d53a3be36c68189a28b2" UNIQUE ("name"), CONSTRAINT "PK_8da47255f0d9940d2aa82e36ea5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tournament" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "is_finished" boolean NOT NULL DEFAULT false, "image" character varying, CONSTRAINT "UQ_39c996e461f5fe152d4811f9e54" UNIQUE ("name"), CONSTRAINT "PK_449f912ba2b62be003f0c22e767" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."PhaseOptions" AS ENUM('sixteenths final', 'eighth final', 'quarters final', 'semi final', 'third and fourth', 'final')`);
        await queryRunner.query(`CREATE TABLE "tournament_phase" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "phase" "public"."PhaseOptions" NOT NULL DEFAULT 'eighth final', "tournament_id" integer, CONSTRAINT "PK_98060de7807728d0a0270c0b30a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tournament_match" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "goals_local" integer, "goals_visit" integer, "penals_local" integer, "penals_visit" integer, "is_defined" boolean NOT NULL DEFAULT false, "is_finished" boolean NOT NULL DEFAULT false, "start_at" TIMESTAMP NOT NULL, "local_condition" character varying(30), "visit_condition" character varying(30), "journey" smallint, "local_team_id" integer, "visit_team_id" integer, "tournament_id" integer, "phase_id" integer, "group_stage_id" integer, CONSTRAINT "PK_a493cbf8996a888c72f9cb46a0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tournament_group_stage" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying, "tournament_id" integer, CONSTRAINT "PK_a0f40017cda7ddaf307eafe42ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tournament_tournament_team" ("tournament_id" integer NOT NULL, "team_id" integer NOT NULL, CONSTRAINT "PK_e99a137a1384b0667fc066c131d" PRIMARY KEY ("tournament_id", "team_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_931a8574b048d3b4a07f2c53b2" ON "tournament_tournament_team" ("tournament_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ae635069da66adf6c365483736" ON "tournament_tournament_team" ("team_id") `);
        await queryRunner.query(`CREATE TABLE "tournament_group_stage_team" ("group_stage_id" integer NOT NULL, "team_id" integer NOT NULL, CONSTRAINT "PK_f59d120b6a4468b247aee77a972" PRIMARY KEY ("group_stage_id", "team_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_05f45d42a8c280e80393f8ec2f" ON "tournament_group_stage_team" ("group_stage_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d95d410088a951427417b0bd27" ON "tournament_group_stage_team" ("team_id") `);
        await queryRunner.query(`ALTER TABLE "group_membership" ADD CONSTRAINT "FK_bf83ea989836a2ff52ab405dff9" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_membership" ADD CONSTRAINT "FK_7a1166a6e3a6a3431a699257719" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_invitation" ADD CONSTRAINT "FK_e0891bfee39220e03c06cd64158" FOREIGN KEY ("issued_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_invitation" ADD CONSTRAINT "FK_19d894db6fdb14900e05516a4a0" FOREIGN KEY ("issued_to_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_invitation" ADD CONSTRAINT "FK_eb10d33ede2fa8dce934492c5a7" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7" FOREIGN KEY ("profile_id") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_access_request" ADD CONSTRAINT "FK_2ade771645d0af79512e54818a0" FOREIGN KEY ("issued_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_access_request" ADD CONSTRAINT "FK_2e988dc40f3847bcb27dd280c06" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournament_phase" ADD CONSTRAINT "FK_4d60fa0d4818d9516a9d0fa8baa" FOREIGN KEY ("tournament_id") REFERENCES "tournament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournament_match" ADD CONSTRAINT "FK_8d39515dcd74eaa9cdda1161852" FOREIGN KEY ("local_team_id") REFERENCES "tournament_team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournament_match" ADD CONSTRAINT "FK_63a21f31c2919b076c43218076c" FOREIGN KEY ("visit_team_id") REFERENCES "tournament_team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournament_match" ADD CONSTRAINT "FK_3b52f932c74a2b0b3f647dcc91b" FOREIGN KEY ("tournament_id") REFERENCES "tournament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournament_match" ADD CONSTRAINT "FK_e6a823eec8eaaa5a3802f624a3f" FOREIGN KEY ("phase_id") REFERENCES "tournament_phase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournament_match" ADD CONSTRAINT "FK_86a32062ebf15e5845b0e7fed94" FOREIGN KEY ("group_stage_id") REFERENCES "tournament_group_stage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournament_group_stage" ADD CONSTRAINT "FK_23f4fd5c0e97f0a2d41fd7818d5" FOREIGN KEY ("tournament_id") REFERENCES "tournament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournament_tournament_team" ADD CONSTRAINT "FK_931a8574b048d3b4a07f2c53b2c" FOREIGN KEY ("tournament_id") REFERENCES "tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tournament_tournament_team" ADD CONSTRAINT "FK_ae635069da66adf6c3654837365" FOREIGN KEY ("team_id") REFERENCES "tournament_team"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tournament_group_stage_team" ADD CONSTRAINT "FK_05f45d42a8c280e80393f8ec2f6" FOREIGN KEY ("group_stage_id") REFERENCES "tournament_group_stage"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tournament_group_stage_team" ADD CONSTRAINT "FK_d95d410088a951427417b0bd276" FOREIGN KEY ("team_id") REFERENCES "tournament_team"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tournament_group_stage_team" DROP CONSTRAINT "FK_d95d410088a951427417b0bd276"`);
        await queryRunner.query(`ALTER TABLE "tournament_group_stage_team" DROP CONSTRAINT "FK_05f45d42a8c280e80393f8ec2f6"`);
        await queryRunner.query(`ALTER TABLE "tournament_tournament_team" DROP CONSTRAINT "FK_ae635069da66adf6c3654837365"`);
        await queryRunner.query(`ALTER TABLE "tournament_tournament_team" DROP CONSTRAINT "FK_931a8574b048d3b4a07f2c53b2c"`);
        await queryRunner.query(`ALTER TABLE "tournament_group_stage" DROP CONSTRAINT "FK_23f4fd5c0e97f0a2d41fd7818d5"`);
        await queryRunner.query(`ALTER TABLE "tournament_match" DROP CONSTRAINT "FK_86a32062ebf15e5845b0e7fed94"`);
        await queryRunner.query(`ALTER TABLE "tournament_match" DROP CONSTRAINT "FK_e6a823eec8eaaa5a3802f624a3f"`);
        await queryRunner.query(`ALTER TABLE "tournament_match" DROP CONSTRAINT "FK_3b52f932c74a2b0b3f647dcc91b"`);
        await queryRunner.query(`ALTER TABLE "tournament_match" DROP CONSTRAINT "FK_63a21f31c2919b076c43218076c"`);
        await queryRunner.query(`ALTER TABLE "tournament_match" DROP CONSTRAINT "FK_8d39515dcd74eaa9cdda1161852"`);
        await queryRunner.query(`ALTER TABLE "tournament_phase" DROP CONSTRAINT "FK_4d60fa0d4818d9516a9d0fa8baa"`);
        await queryRunner.query(`ALTER TABLE "group_access_request" DROP CONSTRAINT "FK_2e988dc40f3847bcb27dd280c06"`);
        await queryRunner.query(`ALTER TABLE "group_access_request" DROP CONSTRAINT "FK_2ade771645d0af79512e54818a0"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7"`);
        await queryRunner.query(`ALTER TABLE "group_invitation" DROP CONSTRAINT "FK_eb10d33ede2fa8dce934492c5a7"`);
        await queryRunner.query(`ALTER TABLE "group_invitation" DROP CONSTRAINT "FK_19d894db6fdb14900e05516a4a0"`);
        await queryRunner.query(`ALTER TABLE "group_invitation" DROP CONSTRAINT "FK_e0891bfee39220e03c06cd64158"`);
        await queryRunner.query(`ALTER TABLE "group_membership" DROP CONSTRAINT "FK_7a1166a6e3a6a3431a699257719"`);
        await queryRunner.query(`ALTER TABLE "group_membership" DROP CONSTRAINT "FK_bf83ea989836a2ff52ab405dff9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d95d410088a951427417b0bd27"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_05f45d42a8c280e80393f8ec2f"`);
        await queryRunner.query(`DROP TABLE "tournament_group_stage_team"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ae635069da66adf6c365483736"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_931a8574b048d3b4a07f2c53b2"`);
        await queryRunner.query(`DROP TABLE "tournament_tournament_team"`);
        await queryRunner.query(`DROP TABLE "tournament_group_stage"`);
        await queryRunner.query(`DROP TABLE "tournament_match"`);
        await queryRunner.query(`DROP TABLE "tournament_phase"`);
        await queryRunner.query(`DROP TYPE "public"."PhaseOptions"`);
        await queryRunner.query(`DROP TABLE "tournament"`);
        await queryRunner.query(`DROP TABLE "tournament_team"`);
        await queryRunner.query(`DROP TABLE "group_access_request"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."Role"`);
        await queryRunner.query(`DROP TABLE "group_invitation"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7a1166a6e3a6a3431a69925771"`);
        await queryRunner.query(`DROP TABLE "group_membership"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "user_profile"`);
    }

}
