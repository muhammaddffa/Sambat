/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `deletedAt`,
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;
