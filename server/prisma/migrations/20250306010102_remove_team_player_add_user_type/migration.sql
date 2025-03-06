/*
  Warnings:

  - You are about to drop the `players` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teams` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('PLAYER', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'PLAYER';

-- DropTable
DROP TABLE "players";

-- DropTable
DROP TABLE "teams";
