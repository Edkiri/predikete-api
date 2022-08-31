import { MigrationInterface, QueryRunner } from "typeorm";

export class init1661701598515 implements MigrationInterface {
    name = 'init1661701598515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_profile" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "picture" character varying(255), CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_membership" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_admin" boolean NOT NULL DEFAULT false, "user_id" integer, "group_id" integer, CONSTRAINT "PK_b631623cf04fa74513b975e7059" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bf83ea989836a2ff52ab405dff" ON "group_membership" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7a1166a6e3a6a3431a69925771" ON "group_membership" ("group_id") `);
        await queryRunner.query(`CREATE TABLE "tournament_team" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "image" character varying, "tournament_id" integer, "group_stage_id" integer, CONSTRAINT "UQ_88a7b53d53a3be36c68189a28b2" UNIQUE ("name"), CONSTRAINT "PK_8da47255f0d9940d2aa82e36ea5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."PhaseOptions" AS ENUM('group stage', 'sixteenths final', 'eighth final', 'quarters final', 'semi final', 'third and fourth', 'final')`);
        await queryRunner.query(`CREATE TABLE "tournament_match" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "goals_local" integer, "goals_visit" integer, "penals_local" integer, "penals_visit" integer, "phase" "public"."PhaseOptions" NOT NULL DEFAULT 'group stage', "is_defined" boolean NOT NULL DEFAULT false, "is_finished" boolean NOT NULL DEFAULT false, "start_at" TIMESTAMP NOT NULL, "local_condition" character varying(30), "visit_condition" character varying(30), "journey" smallint, "local_team_id" integer, "visit_team_id" integer, "tournament_id" integer, "group_stage_id" integer, CONSTRAINT "PK_a493cbf8996a888c72f9cb46a0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_71f57c4023c9afadd3a4ea177f" ON "tournament_match" ("phase") `);
        await queryRunner.query(`CREATE TABLE "tournament_group_stage" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying, "tournament_id" integer, CONSTRAINT "PK_a0f40017cda7ddaf307eafe42ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tournament" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "is_finished" boolean NOT NULL DEFAULT false, "image" character varying, CONSTRAINT "UQ_39c996e461f5fe152d4811f9e54" UNIQUE ("name"), CONSTRAINT "PK_449f912ba2b62be003f0c22e767" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pool_match" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "goals_local" integer, "goals_visit" integer, "penals_local" integer, "penals_visit" integer, "points" integer NOT NULL DEFAULT '0', "is_calculated" boolean NOT NULL DEFAULT false, "local_team_id" integer, "visit_team_id" integer, "pool_id" integer, "tournament_match_id" integer, CONSTRAINT "PK_59727b30a7b3857ddda83b3c35e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d59722076a5225e9823701a134" ON "pool_match" ("pool_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c2c904d142c2df4c0eada01e82" ON "pool_match" ("tournament_match_id") `);
        await queryRunner.query(`CREATE TABLE "pool" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "completed" boolean NOT NULL DEFAULT false, "points" integer NOT NULL DEFAULT '0', "owner_id" integer, "group_id" integer, "tournament_id" integer, CONSTRAINT "PK_db1bfe411e1516c01120b85f8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "about" character varying(100), "picture" character varying(255), CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_invitation" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "message" character varying(255), "issued_by_id" integer, "issued_to_id" integer, "group_id" integer, CONSTRAINT "PK_355b6961ab356c14344bf323764" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Role" AS ENUM('admin', 'client')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "display_name" character varying(20) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."Role" NOT NULL DEFAULT 'client', "profile_id" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_f44d0cd18cfd80b0fed7806c3b" UNIQUE ("profile_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_access_request" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "message" character varying(255), "issued_by" integer, "group_id" integer, CONSTRAINT "PK_b457d04011fb56468b0d61c8b40" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "group_membership" ADD CONSTRAINT "FK_bf83ea989836a2ff52ab405dff9" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_membership" ADD CONSTRAINT "FK_7a1166a6e3a6a3431a699257719" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournament_team" ADD CONSTRAINT "FK_1a3dcfc3f3ce223e90c3a9915be" FOREIGN KEY ("tournament_id") REFERENCES "tournament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournament_team" ADD CONSTRAINT "FK_0dca7712703ca92f585509ee609" FOREIGN KEY ("group_stage_id") REFERENCES "tournament_group_stage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournament_match" ADD CONSTRAINT "FK_8d39515dcd74eaa9cdda1161852" FOREIGN KEY ("local_team_id") REFERENCES "tournament_team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournament_match" ADD CONSTRAINT "FK_63a21f31c2919b076c43218076c" FOREIGN KEY ("visit_team_id") REFERENCES "tournament_team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournament_match" ADD CONSTRAINT "FK_3b52f932c74a2b0b3f647dcc91b" FOREIGN KEY ("tournament_id") REFERENCES "tournament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournament_match" ADD CONSTRAINT "FK_86a32062ebf15e5845b0e7fed94" FOREIGN KEY ("group_stage_id") REFERENCES "tournament_group_stage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournament_group_stage" ADD CONSTRAINT "FK_23f4fd5c0e97f0a2d41fd7818d5" FOREIGN KEY ("tournament_id") REFERENCES "tournament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool_match" ADD CONSTRAINT "FK_47d5b5b39c2090ca3b1ece1d517" FOREIGN KEY ("local_team_id") REFERENCES "tournament_team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool_match" ADD CONSTRAINT "FK_57d2be80d3285bca4708936d0e3" FOREIGN KEY ("visit_team_id") REFERENCES "tournament_team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool_match" ADD CONSTRAINT "FK_d59722076a5225e9823701a1347" FOREIGN KEY ("pool_id") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool_match" ADD CONSTRAINT "FK_c2c904d142c2df4c0eada01e829" FOREIGN KEY ("tournament_match_id") REFERENCES "tournament_match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_6ee0abc520db0e34d73c5bdd3cc" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_2f32d60c499c8949c2b3099e760" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_5be844941cb53c536358ba15894" FOREIGN KEY ("tournament_id") REFERENCES "tournament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_invitation" ADD CONSTRAINT "FK_e0891bfee39220e03c06cd64158" FOREIGN KEY ("issued_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_invitation" ADD CONSTRAINT "FK_19d894db6fdb14900e05516a4a0" FOREIGN KEY ("issued_to_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_invitation" ADD CONSTRAINT "FK_eb10d33ede2fa8dce934492c5a7" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7" FOREIGN KEY ("profile_id") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_access_request" ADD CONSTRAINT "FK_2ade771645d0af79512e54818a0" FOREIGN KEY ("issued_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_access_request" ADD CONSTRAINT "FK_2e988dc40f3847bcb27dd280c06" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_access_request" DROP CONSTRAINT "FK_2e988dc40f3847bcb27dd280c06"`);
        await queryRunner.query(`ALTER TABLE "group_access_request" DROP CONSTRAINT "FK_2ade771645d0af79512e54818a0"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7"`);
        await queryRunner.query(`ALTER TABLE "group_invitation" DROP CONSTRAINT "FK_eb10d33ede2fa8dce934492c5a7"`);
        await queryRunner.query(`ALTER TABLE "group_invitation" DROP CONSTRAINT "FK_19d894db6fdb14900e05516a4a0"`);
        await queryRunner.query(`ALTER TABLE "group_invitation" DROP CONSTRAINT "FK_e0891bfee39220e03c06cd64158"`);
        await queryRunner.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_5be844941cb53c536358ba15894"`);
        await queryRunner.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_2f32d60c499c8949c2b3099e760"`);
        await queryRunner.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_6ee0abc520db0e34d73c5bdd3cc"`);
        await queryRunner.query(`ALTER TABLE "pool_match" DROP CONSTRAINT "FK_c2c904d142c2df4c0eada01e829"`);
        await queryRunner.query(`ALTER TABLE "pool_match" DROP CONSTRAINT "FK_d59722076a5225e9823701a1347"`);
        await queryRunner.query(`ALTER TABLE "pool_match" DROP CONSTRAINT "FK_57d2be80d3285bca4708936d0e3"`);
        await queryRunner.query(`ALTER TABLE "pool_match" DROP CONSTRAINT "FK_47d5b5b39c2090ca3b1ece1d517"`);
        await queryRunner.query(`ALTER TABLE "tournament_group_stage" DROP CONSTRAINT "FK_23f4fd5c0e97f0a2d41fd7818d5"`);
        await queryRunner.query(`ALTER TABLE "tournament_match" DROP CONSTRAINT "FK_86a32062ebf15e5845b0e7fed94"`);
        await queryRunner.query(`ALTER TABLE "tournament_match" DROP CONSTRAINT "FK_3b52f932c74a2b0b3f647dcc91b"`);
        await queryRunner.query(`ALTER TABLE "tournament_match" DROP CONSTRAINT "FK_63a21f31c2919b076c43218076c"`);
        await queryRunner.query(`ALTER TABLE "tournament_match" DROP CONSTRAINT "FK_8d39515dcd74eaa9cdda1161852"`);
        await queryRunner.query(`ALTER TABLE "tournament_team" DROP CONSTRAINT "FK_0dca7712703ca92f585509ee609"`);
        await queryRunner.query(`ALTER TABLE "tournament_team" DROP CONSTRAINT "FK_1a3dcfc3f3ce223e90c3a9915be"`);
        await queryRunner.query(`ALTER TABLE "group_membership" DROP CONSTRAINT "FK_7a1166a6e3a6a3431a699257719"`);
        await queryRunner.query(`ALTER TABLE "group_membership" DROP CONSTRAINT "FK_bf83ea989836a2ff52ab405dff9"`);
        await queryRunner.query(`DROP TABLE "group_access_request"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."Role"`);
        await queryRunner.query(`DROP TABLE "group_invitation"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "pool"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c2c904d142c2df4c0eada01e82"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d59722076a5225e9823701a134"`);
        await queryRunner.query(`DROP TABLE "pool_match"`);
        await queryRunner.query(`DROP TABLE "tournament"`);
        await queryRunner.query(`DROP TABLE "tournament_group_stage"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_71f57c4023c9afadd3a4ea177f"`);
        await queryRunner.query(`DROP TABLE "tournament_match"`);
        await queryRunner.query(`DROP TYPE "public"."PhaseOptions"`);
        await queryRunner.query(`DROP TABLE "tournament_team"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7a1166a6e3a6a3431a69925771"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf83ea989836a2ff52ab405dff"`);
        await queryRunner.query(`DROP TABLE "group_membership"`);
        await queryRunner.query(`DROP TABLE "user_profile"`);
    }

}
