/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `isDeleted`,
    ADD COLUMN `deletedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
