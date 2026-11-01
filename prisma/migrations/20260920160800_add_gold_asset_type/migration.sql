-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('CURRENCY', 'GOLD');

-- AlterTable
ALTER TABLE "Investment" ADD COLUMN     "assetType" "AssetType" NOT NULL DEFAULT 'CURRENCY';
