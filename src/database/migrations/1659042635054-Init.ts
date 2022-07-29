import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1659042635054 implements MigrationInterface {
  name = 'Init1659042635054';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "teams" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "image" character varying, CONSTRAINT "UQ_48c0c32e6247a2de155baeaf980" UNIQUE ("name"), CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tournaments" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "image" character varying, "is_finished" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_b63b048f5871d7f48cdb4d4de1a" UNIQUE ("name"), CONSTRAINT "PK_6d5d129da7a80cf99e8ad4833a9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "group_stages" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying, "tournament_id" integer, CONSTRAINT "PK_fde9e0aaf445cfd77f2af73e4ca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."phases_phase_enum" AS ENUM('sixteenths final', 'eighth final', 'quarters final', 'semi final', 'third and fourth', 'final')`,
    );
    await queryRunner.query(
      `CREATE TABLE "phases" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "phase" "public"."phases_phase_enum" NOT NULL, "tournament_id" integer, CONSTRAINT "PK_e93bb53460b28d4daf72735d5d3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "matches" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "goals_local" integer, "goals_visit" integer, "penals_local" integer, "penals_visit" integer, "is_defined" boolean NOT NULL DEFAULT false, "is_finished" boolean NOT NULL DEFAULT false, "start_at" TIMESTAMP NOT NULL, "local_condition" character varying(11), "visit_condition" character varying(11), "journey" smallint, "local_team_id" integer, "visit_team_id" integer, "tournament_id" integer, "phase_id" integer, "group_stage_id" integer, CONSTRAINT "PK_8a22c7b2e0828988d51256117f4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "groups" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "about" text, "picture" character varying(255), CONSTRAINT "UQ_664ea405ae2a10c264d582ee563" UNIQUE ("name"), CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "picture" character varying(255), "description" text, CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'client')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" character varying(255) NOT NULL, "username" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'client', "profile_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "REL_23371445bd80cb3e413089551b" UNIQUE ("profile_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "memberships" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_admin" boolean NOT NULL DEFAULT false, "user_id" integer, "group_id" integer, CONSTRAINT "PK_25d28bd932097a9e90495ede7b4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pools" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "completed" boolean NOT NULL DEFAULT false, "points" integer NOT NULL DEFAULT '0', "membership_id" integer, "tournament_id" integer, CONSTRAINT "PK_6708c86fc389259de3ee43230ee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pools_matches" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "goals_local" integer, "goals_visit" integer, "penals_local" integer, "penals_visit" integer, "is_predicted" boolean NOT NULL DEFAULT false, "is_calculated" boolean NOT NULL DEFAULT false, "points" integer NOT NULL DEFAULT '0', "local_team_id" integer, "visit_team_id" integer, "pool_id" integer, "match_id" integer, CONSTRAINT "PK_454b82e212508846925d1780c0a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "invitations" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "message" text, "issued_by" integer, "issued_to" integer, "group_id" integer, CONSTRAINT "PK_5dec98cfdfd562e4ad3648bbb07" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "requests" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "message" text, "issued_by" integer, "group_id" integer, CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "teams-tournaments" ("tournament_id" integer NOT NULL, "team_id" integer NOT NULL, CONSTRAINT "PK_680961f40b1a164dd470ea30ff4" PRIMARY KEY ("tournament_id", "team_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5c8cdac8247ade3f0ba7d8035c" ON "teams-tournaments" ("tournament_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_50dd09e3581a52b8ef6b9e2782" ON "teams-tournaments" ("team_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "teams-group-stages" ("group_stage_id" integer NOT NULL, "team_id" integer NOT NULL, CONSTRAINT "PK_854413de63870e009f27cce3282" PRIMARY KEY ("group_stage_id", "team_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8759e5ed5a2944c08647b039be" ON "teams-group-stages" ("group_stage_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e4330401fb3d423aafb31fa793" ON "teams-group-stages" ("team_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "group_stages" ADD CONSTRAINT "FK_851111e624be7d25b29c66e6c5a" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "phases" ADD CONSTRAINT "FK_38239acd04502fb5f883d2956a2" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "matches" ADD CONSTRAINT "FK_bf613b7dda3744281dfdd2594d6" FOREIGN KEY ("local_team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "matches" ADD CONSTRAINT "FK_3ebf70b82c6d820589776472e14" FOREIGN KEY ("visit_team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "matches" ADD CONSTRAINT "FK_d0fb132a9b17b5801b916662147" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "matches" ADD CONSTRAINT "FK_4445c1b2bd39fe81088ea640acb" FOREIGN KEY ("phase_id") REFERENCES "phases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "matches" ADD CONSTRAINT "FK_ec1005d881afa77500bad220bf5" FOREIGN KEY ("group_stage_id") REFERENCES "group_stages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_23371445bd80cb3e413089551bf" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "memberships" ADD CONSTRAINT "FK_7c1e2fdfed4f6838e0c05ae5051" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "memberships" ADD CONSTRAINT "FK_253a15e6c430fc2e5bb84c4afda" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pools" ADD CONSTRAINT "FK_479a6a0e6bbd77d18f0efa6998d" FOREIGN KEY ("membership_id") REFERENCES "memberships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pools" ADD CONSTRAINT "FK_7e69ceb214cad8fecca28e26cba" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pools_matches" ADD CONSTRAINT "FK_ba2dedb4bd691b415e7bab03143" FOREIGN KEY ("local_team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pools_matches" ADD CONSTRAINT "FK_b21871ab5f58d538e89dc1f1a4a" FOREIGN KEY ("visit_team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pools_matches" ADD CONSTRAINT "FK_ef84695e9d7da978f56040387cc" FOREIGN KEY ("pool_id") REFERENCES "pools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pools_matches" ADD CONSTRAINT "FK_2adea056a4caf792eed1395be78" FOREIGN KEY ("match_id") REFERENCES "matches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invitations" ADD CONSTRAINT "FK_8b9e04c58f5da045928ce1b379f" FOREIGN KEY ("issued_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invitations" ADD CONSTRAINT "FK_eab8e4786821e7f2d85b8297833" FOREIGN KEY ("issued_to") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invitations" ADD CONSTRAINT "FK_06b302ebb4ecf4725f6278cdf42" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_c24271cabb2c58c2cfe9c148aa9" FOREIGN KEY ("issued_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_a1289c5ff0911c22a96359a806c" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "teams-tournaments" ADD CONSTRAINT "FK_5c8cdac8247ade3f0ba7d8035c5" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "teams-tournaments" ADD CONSTRAINT "FK_50dd09e3581a52b8ef6b9e2782e" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "teams-group-stages" ADD CONSTRAINT "FK_8759e5ed5a2944c08647b039bee" FOREIGN KEY ("group_stage_id") REFERENCES "group_stages"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "teams-group-stages" ADD CONSTRAINT "FK_e4330401fb3d423aafb31fa7935" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "teams-group-stages" DROP CONSTRAINT "FK_e4330401fb3d423aafb31fa7935"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teams-group-stages" DROP CONSTRAINT "FK_8759e5ed5a2944c08647b039bee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teams-tournaments" DROP CONSTRAINT "FK_50dd09e3581a52b8ef6b9e2782e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teams-tournaments" DROP CONSTRAINT "FK_5c8cdac8247ade3f0ba7d8035c5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "FK_a1289c5ff0911c22a96359a806c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "FK_c24271cabb2c58c2cfe9c148aa9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invitations" DROP CONSTRAINT "FK_06b302ebb4ecf4725f6278cdf42"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invitations" DROP CONSTRAINT "FK_eab8e4786821e7f2d85b8297833"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invitations" DROP CONSTRAINT "FK_8b9e04c58f5da045928ce1b379f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pools_matches" DROP CONSTRAINT "FK_2adea056a4caf792eed1395be78"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pools_matches" DROP CONSTRAINT "FK_ef84695e9d7da978f56040387cc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pools_matches" DROP CONSTRAINT "FK_b21871ab5f58d538e89dc1f1a4a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pools_matches" DROP CONSTRAINT "FK_ba2dedb4bd691b415e7bab03143"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pools" DROP CONSTRAINT "FK_7e69ceb214cad8fecca28e26cba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pools" DROP CONSTRAINT "FK_479a6a0e6bbd77d18f0efa6998d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "memberships" DROP CONSTRAINT "FK_253a15e6c430fc2e5bb84c4afda"`,
    );
    await queryRunner.query(
      `ALTER TABLE "memberships" DROP CONSTRAINT "FK_7c1e2fdfed4f6838e0c05ae5051"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_23371445bd80cb3e413089551bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "matches" DROP CONSTRAINT "FK_ec1005d881afa77500bad220bf5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "matches" DROP CONSTRAINT "FK_4445c1b2bd39fe81088ea640acb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "matches" DROP CONSTRAINT "FK_d0fb132a9b17b5801b916662147"`,
    );
    await queryRunner.query(
      `ALTER TABLE "matches" DROP CONSTRAINT "FK_3ebf70b82c6d820589776472e14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "matches" DROP CONSTRAINT "FK_bf613b7dda3744281dfdd2594d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "phases" DROP CONSTRAINT "FK_38239acd04502fb5f883d2956a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_stages" DROP CONSTRAINT "FK_851111e624be7d25b29c66e6c5a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e4330401fb3d423aafb31fa793"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8759e5ed5a2944c08647b039be"`,
    );
    await queryRunner.query(`DROP TABLE "teams-group-stages"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_50dd09e3581a52b8ef6b9e2782"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5c8cdac8247ade3f0ba7d8035c"`,
    );
    await queryRunner.query(`DROP TABLE "teams-tournaments"`);
    await queryRunner.query(`DROP TABLE "requests"`);
    await queryRunner.query(`DROP TABLE "invitations"`);
    await queryRunner.query(`DROP TABLE "pools_matches"`);
    await queryRunner.query(`DROP TABLE "pools"`);
    await queryRunner.query(`DROP TABLE "memberships"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "profiles"`);
    await queryRunner.query(`DROP TABLE "groups"`);
    await queryRunner.query(`DROP TABLE "matches"`);
    await queryRunner.query(`DROP TABLE "phases"`);
    await queryRunner.query(`DROP TYPE "public"."phases_phase_enum"`);
    await queryRunner.query(`DROP TABLE "group_stages"`);
    await queryRunner.query(`DROP TABLE "tournaments"`);
    await queryRunner.query(`DROP TABLE "teams"`);
  }
}
