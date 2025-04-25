/*
  Warnings:

  - You are about to drop the `game_results` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "game_results" DROP CONSTRAINT "game_results_session_id_fkey";

-- DropForeignKey
ALTER TABLE "game_results" DROP CONSTRAINT "game_results_team_a_id_fkey";

-- DropForeignKey
ALTER TABLE "game_results" DROP CONSTRAINT "game_results_team_b_id_fkey";

-- DropForeignKey
ALTER TABLE "game_results" DROP CONSTRAINT "game_results_winner_team_id_fkey";

-- DropTable
DROP TABLE "game_results";

-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);
