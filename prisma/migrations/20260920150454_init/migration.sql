-- CreateEnum
CREATE TYPE "InvestmentType" AS ENUM ('VARIABLE', 'FIXED');

-- CreateEnum
CREATE TYPE "InvestmentStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "TransactionMethod" AS ENUM ('CASH', 'BANK', 'OTHER');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('LKR', 'USD', 'EUR', 'GBP', 'AED', 'SAR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investment" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "codeName" TEXT NOT NULL,
    "type" "InvestmentType" NOT NULL DEFAULT 'VARIABLE',
    "status" "InvestmentStatus" NOT NULL DEFAULT 'OPEN',
    "currency" "Currency" NOT NULL DEFAULT 'LKR',
    "fixedRatePerMonth" DECIMAL(10,4),
    "totalPrincipal" DECIMAL(18,2),
    "totalReturned" DECIMAL(18,2),
    "profitAmount" DECIMAL(18,2),
    "durationMonths" DECIMAL(10,4),
    "monthlyProfitPercent" DECIMAL(10,4),
    "openedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "closedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "investmentId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "method" "TransactionMethod" NOT NULL DEFAULT 'CASH',
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Investment_codeName_key" ON "Investment"("codeName");

-- CreateIndex
CREATE INDEX "Investment_companyId_idx" ON "Investment"("companyId");

-- CreateIndex
CREATE INDEX "Investment_status_idx" ON "Investment"("status");

-- CreateIndex
CREATE INDEX "Investment_type_idx" ON "Investment"("type");

-- CreateIndex
CREATE INDEX "Transaction_investmentId_idx" ON "Transaction"("investmentId");

-- CreateIndex
CREATE INDEX "Transaction_date_idx" ON "Transaction"("date");

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "Investment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
