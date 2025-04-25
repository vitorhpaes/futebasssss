-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "season_id" INTEGER;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "Season"("id") ON DELETE SET NULL ON UPDATE CASCADE;
