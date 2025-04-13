/*
  Warnings:

  - You are about to drop the column `team_id` on the `player_favorites` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "player_favorites" DROP CONSTRAINT "player_favorites_team_id_fkey";

-- AlterTable
ALTER TABLE "player_favorites" DROP COLUMN "team_id";
