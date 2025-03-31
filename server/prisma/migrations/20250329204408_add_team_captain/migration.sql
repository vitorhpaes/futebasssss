/*
  Warnings:

  - A unique constraint covering the columns `[captain_id]` on the table `teams` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "captain_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "teams_captain_id_key" ON "teams"("captain_id");

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_captain_id_fkey" FOREIGN KEY ("captain_id") REFERENCES "player_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
