-- AlterTable
ALTER TABLE "experience" ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0;
