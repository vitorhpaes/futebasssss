-- DropForeignKey
ALTER TABLE "player_sessions" DROP CONSTRAINT "player_sessions_team_id_fkey";

-- AlterTable
ALTER TABLE "player_sessions" ADD COLUMN     "willPlay" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "team_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "player_sessions" ADD CONSTRAINT "player_sessions_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;
