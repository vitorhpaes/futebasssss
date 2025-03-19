-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "session_id" INTEGER;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
