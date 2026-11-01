-- Investment portfolio data load (insert-only).
-- Generated from the source notes in /home/razan/Razan/Investments.
-- Runs in a single transaction: if any row fails (e.g. a company or code name already
-- exists) nothing is inserted. Does not touch "User".
-- Apply with:  psql "$DATABASE_URL" -f prisma/import-data.sql

BEGIN;

-- GGP Textile
INSERT INTO "Company" ("id","name","notes","updatedAt") VALUES ('imp_c_ggp_textile', 'GGP Textile', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_ggp001', 'imp_c_ggp_textile', 'GGP001', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 1000000.00, 1084600.00, 84600.00, 3.3183, 3.9015, '2026-01-04 00:00:00', '2026-04-15 00:00:00', NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_ggp001_01', 'imp_i_ggp001', '2026-01-04 00:00:00', -1000000.00, 'BANK', NULL, now()),
  ('imp_t_ggp001_02', 'imp_i_ggp001', '2026-03-04 00:00:00', 500000.00, 'BANK', NULL, now()),
  ('imp_t_ggp001_03', 'imp_i_ggp001', '2026-03-18 00:00:00', 500000.00, 'BANK', NULL, now()),
  ('imp_t_ggp001_04', 'imp_i_ggp001', '2026-04-15 00:00:00', 84600.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_ggp002', 'imp_c_ggp_textile', 'GGP002', 'VARIABLE', 'OPEN', 'CURRENCY', 'LKR', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-14 00:00:00', NULL, NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_ggp002_01', 'imp_i_ggp002', '2026-02-14 00:00:00', -1000000.00, 'BANK', NULL, now()),
  ('imp_t_ggp002_02', 'imp_i_ggp002', '2026-05-18 00:00:00', 500000.00, 'BANK', NULL, now()),
  ('imp_t_ggp002_03', 'imp_i_ggp002', '2026-05-21 00:00:00', 500000.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_ggp003', 'imp_c_ggp_textile', 'GGP003', 'VARIABLE', 'OPEN', 'CURRENCY', 'LKR', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-04 00:00:00', NULL, NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_ggp003_01', 'imp_i_ggp003', '2026-03-04 00:00:00', -1000000.00, 'BANK', NULL, now()),
  ('imp_t_ggp003_02', 'imp_i_ggp003', '2026-07-01 00:00:00', 500000.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_ggp004', 'imp_c_ggp_textile', 'GGP004', 'VARIABLE', 'OPEN', 'CURRENCY', 'LKR', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-21 00:00:00', NULL, NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_ggp004_01', 'imp_i_ggp004', '2026-05-21 00:00:00', -650000.00, 'BANK', NULL, now()),
  ('imp_t_ggp004_02', 'imp_i_ggp004', '2026-05-22 00:00:00', -350000.00, 'BANK', NULL, now()),
  ('imp_t_ggp004_03', 'imp_i_ggp004', '2026-09-14 00:00:00', 350000.00, 'BANK', NULL, now()),
  ('imp_t_ggp004_04', 'imp_i_ggp004', '2026-09-21 00:00:00', 100000.00, 'BANK', NULL, now()),
  ('imp_t_ggp004_05', 'imp_i_ggp004', '2026-09-25 00:00:00', 220000.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_ggp005', 'imp_c_ggp_textile', 'GGP005', 'VARIABLE', 'OPEN', 'CURRENCY', 'LKR', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-10-28 00:00:00', NULL, NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_ggp005_01', 'imp_i_ggp005', '2026-10-28 00:00:00', -1750000.00, 'BANK', NULL, now()),
  ('imp_t_ggp005_02', 'imp_i_ggp005', '2026-10-30 00:00:00', -250000.00, 'BANK', NULL, now());

-- GGP Chocolate
INSERT INTO "Company" ("id","name","notes","updatedAt") VALUES ('imp_c_ggp_chocolate', 'GGP Chocolate', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_choc001', 'imp_c_ggp_chocolate', 'CHOC001', 'VARIABLE', 'OPEN', 'CURRENCY', 'LKR', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-11 00:00:00', NULL, NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_choc001_01', 'imp_i_choc001', '2026-07-11 00:00:00', -934713.00, 'BANK', NULL, now()),
  ('imp_t_choc001_02', 'imp_i_choc001', '2026-08-10 00:00:00', -684250.00, 'BANK', 'for clearance', now()),
  ('imp_t_choc001_03', 'imp_i_choc001', '2026-08-15 00:00:00', 176640.00, 'BANK', NULL, now()),
  ('imp_t_choc001_04', 'imp_i_choc001', '2026-08-17 00:00:00', 500000.00, 'BANK', NULL, now()),
  ('imp_t_choc001_05', 'imp_i_choc001', '2026-08-24 00:00:00', 165000.00, 'BANK', NULL, now()),
  ('imp_t_choc001_06', 'imp_i_choc001', '2026-09-01 00:00:00', 259390.00, 'BANK', NULL, now()),
  ('imp_t_choc001_07', 'imp_i_choc001', '2026-09-05 00:00:00', 65000.00, 'BANK', NULL, now()),
  ('imp_t_choc001_08', 'imp_i_choc001', '2026-09-09 00:00:00', 140000.00, 'BANK', NULL, now()),
  ('imp_t_choc001_09', 'imp_i_choc001', '2026-09-09 00:00:00', 52800.00, 'BANK', NULL, now()),
  ('imp_t_choc001_10', 'imp_i_choc001', '2026-09-11 00:00:00', 60000.00, 'BANK', NULL, now()),
  ('imp_t_choc001_11', 'imp_i_choc001', '2026-10-16 00:00:00', 168000.00, 'BANK', NULL, now()),
  ('imp_t_choc001_12', 'imp_i_choc001', '2026-10-23 00:00:00', 32133.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_choc002', 'imp_c_ggp_chocolate', 'CHOC002', 'VARIABLE', 'OPEN', 'CURRENCY', 'LKR', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-14 00:00:00', NULL, NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_choc002_01', 'imp_i_choc002', '2026-09-14 00:00:00', -550000.00, 'BANK', NULL, now()),
  ('imp_t_choc002_02', 'imp_i_choc002', '2026-09-16 00:00:00', -531940.00, 'BANK', NULL, now()),
  ('imp_t_choc002_03', 'imp_i_choc002', '2026-10-20 00:00:00', -800000.00, 'BANK', NULL, now()),
  ('imp_t_choc002_04', 'imp_i_choc002', '2026-10-23 00:00:00', 30360.00, 'BANK', NULL, now()),
  ('imp_t_choc002_05', 'imp_i_choc002', '2026-10-23 00:00:00', 274770.00, 'BANK', NULL, now()),
  ('imp_t_choc002_06', 'imp_i_choc002', '2026-10-25 00:00:00', 534300.00, 'BANK', NULL, now()),
  ('imp_t_choc002_07', 'imp_i_choc002', '2026-10-28 00:00:00', 150000.00, 'BANK', NULL, now()),
  ('imp_t_choc002_08', 'imp_i_choc002', '2026-10-30 00:00:00', 550000.00, 'BANK', NULL, now());

-- Arshad
INSERT INTO "Company" ("id","name","notes","updatedAt") VALUES ('imp_c_arshad', 'Arshad', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_ai001', 'imp_c_arshad', 'AI001', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 1000000.00, 1012000.00, 12000.00, 0.2628, 4.5656, '2026-07-27 00:00:00', '2026-08-04 00:00:00', NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_ai001_01', 'imp_i_ai001', '2026-07-27 00:00:00', -1000000.00, 'BANK', NULL, now()),
  ('imp_t_ai001_02', 'imp_i_ai001', '2026-08-04 00:00:00', 1012000.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_ai002', 'imp_c_arshad', 'AI002', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 1000000.00, 1016500.00, 16500.00, 1.2813, 1.2877, '2026-08-04 00:00:00', '2026-09-12 00:00:00', NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_ai002_01', 'imp_i_ai002', '2026-08-04 00:00:00', -1000000.00, 'BANK', NULL, now()),
  ('imp_t_ai002_02', 'imp_i_ai002', '2026-09-12 00:00:00', 1016500.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_ai003', 'imp_c_arshad', 'AI003', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 1000000.00, 1012000.00, 12000.00, 0.9199, 1.3045, '2026-08-15 00:00:00', '2026-09-12 00:00:00', NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_ai003_01', 'imp_i_ai003', '2026-08-15 00:00:00', -1000000.00, 'BANK', NULL, now()),
  ('imp_t_ai003_02', 'imp_i_ai003', '2026-09-12 00:00:00', 1012000.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_ai004', 'imp_c_arshad', 'AI004', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 2000000.00, 2028500.00, 28500.00, 0.9199, 1.5915, '2026-09-12 00:00:00', '2026-10-10 00:00:00', NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_ai004_01', 'imp_i_ai004', '2026-09-12 00:00:00', -2000000.00, 'BANK', NULL, now()),
  ('imp_t_ai004_02', 'imp_i_ai004', '2026-10-08 00:00:00', 500000.00, 'BANK', NULL, now()),
  ('imp_t_ai004_03', 'imp_i_ai004', '2026-10-09 00:00:00', 493450.00, 'BANK', NULL, now()),
  ('imp_t_ai004_04', 'imp_i_ai004', '2026-10-10 00:00:00', 1035050.00, 'BANK', NULL, now());

-- Huzni
INSERT INTO "Company" ("id","name","notes","updatedAt") VALUES ('imp_c_huzni', 'Huzni', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_hzn001', 'imp_c_huzni', 'HZN001', 'VARIABLE', 'OPEN', 'CURRENCY', 'LKR', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-10-11 00:00:00', NULL, NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_hzn001_01', 'imp_i_hzn001', '2025-10-11 00:00:00', -1700000.00, 'BANK', NULL, now()),
  ('imp_t_hzn001_02', 'imp_i_hzn001', '2025-10-13 00:00:00', -1000000.00, 'BANK', NULL, now()),
  ('imp_t_hzn001_03', 'imp_i_hzn001', '2025-10-14 00:00:00', -1500000.00, 'BANK', NULL, now());

-- Alpha Jewellers
INSERT INTO "Company" ("id","name","notes","updatedAt") VALUES ('imp_c_alpha_jewellers', 'Alpha Jewellers', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_alpha001', 'imp_c_alpha_jewellers', 'ALPHA001', 'FIXED', 'OPEN', 'GOLD', 'LKR', 'LKR', NULL, NULL, NULL, NULL, NULL, NULL, '2026-08-10 00:00:00', NULL, '15 pawn 24kt gold (1 pawn = 8 g = 120 g) | 4000 LKR per pawn per month', now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_alpha001_01', 'imp_i_alpha001', '2026-08-10 00:00:00', -120.00, 'OTHER', NULL, now()),
  ('imp_t_alpha001_02', 'imp_i_alpha001', '2026-09-19 00:00:00', 60000.00, 'BANK', 'Profit for 15 pawn gold', now()),
  ('imp_t_alpha001_03', 'imp_i_alpha001', '2026-10-19 00:00:00', 60000.00, 'BANK', 'Profit for 15 pawn gold', now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_alpha002', 'imp_c_alpha_jewellers', 'ALPHA002', 'FIXED', 'OPEN', 'CURRENCY', 'LKR', NULL, 1.5000, NULL, NULL, NULL, NULL, NULL, '2026-08-10 00:00:00', NULL, '3,000,000 LKR cash | 1.5% per month', now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_alpha002_01', 'imp_i_alpha002', '2026-08-10 00:00:00', -3000000.00, 'BANK', NULL, now()),
  ('imp_t_alpha002_02', 'imp_i_alpha002', '2026-09-19 00:00:00', 45000.00, 'BANK', 'Profit for 3 million cash', now()),
  ('imp_t_alpha002_03', 'imp_i_alpha002', '2026-10-19 00:00:00', 45000.00, 'BANK', 'Profit for 3 million cash', now());

-- Yoosuf
INSERT INTO "Company" ("id","name","notes","updatedAt") VALUES ('imp_c_yoosuf', 'Yoosuf', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt001', 'imp_c_yoosuf', 'VT001', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 800000.00, 880000.00, 80000.00, 5.9466, 2.3967, '2023-10-17 00:00:00', '2024-04-15 00:00:00', NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt001_01', 'imp_i_vt001', '2023-10-17 00:00:00', -100000.00, 'BANK', NULL, now()),
  ('imp_t_vt001_02', 'imp_i_vt001', '2023-10-23 00:00:00', -200000.00, 'BANK', NULL, now()),
  ('imp_t_vt001_03', 'imp_i_vt001', '2024-01-09 00:00:00', -500000.00, 'BANK', NULL, now()),
  ('imp_t_vt001_04', 'imp_i_vt001', '2024-04-15 00:00:00', 880000.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt002', 'imp_c_yoosuf', 'VT002', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 1000000.00, 1070000.00, 70000.00, 22.1109, 0.3835, '2024-04-15 00:00:00', '2026-02-17 00:00:00', NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt002_01', 'imp_i_vt002', '2024-04-15 00:00:00', -880000.00, 'BANK', NULL, now()),
  ('imp_t_vt002_02', 'imp_i_vt002', '2024-09-29 00:00:00', -120000.00, 'BANK', NULL, now()),
  ('imp_t_vt002_03', 'imp_i_vt002', '2025-09-07 00:00:00', 100000.00, 'BANK', NULL, now()),
  ('imp_t_vt002_04', 'imp_i_vt002', '2025-09-19 00:00:00', 140000.00, 'BANK', NULL, now()),
  ('imp_t_vt002_05', 'imp_i_vt002', '2025-10-04 00:00:00', 100000.00, 'BANK', NULL, now()),
  ('imp_t_vt002_06', 'imp_i_vt002', '2025-10-14 00:00:00', 100000.00, 'BANK', NULL, now()),
  ('imp_t_vt002_07', 'imp_i_vt002', '2025-11-01 00:00:00', 150000.00, 'BANK', NULL, now()),
  ('imp_t_vt002_08', 'imp_i_vt002', '2025-11-01 00:00:00', 50000.00, 'BANK', NULL, now()),
  ('imp_t_vt002_09', 'imp_i_vt002', '2025-11-04 00:00:00', 50000.00, 'BANK', NULL, now()),
  ('imp_t_vt002_10', 'imp_i_vt002', '2025-12-02 00:00:00', 90000.00, 'BANK', NULL, now()),
  ('imp_t_vt002_11', 'imp_i_vt002', '2026-02-17 00:00:00', 290000.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt005', 'imp_c_yoosuf', 'VT005', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 200000.00, 210000.00, 10000.00, 1.3470, 4.6258, '2022-12-27 00:00:00', '2023-02-06 00:00:00', NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt005_01', 'imp_i_vt005', '2022-12-27 00:00:00', -200000.00, 'BANK', NULL, now()),
  ('imp_t_vt005_02', 'imp_i_vt005', '2023-01-28 00:00:00', 180000.00, 'BANK', NULL, now()),
  ('imp_t_vt005_03', 'imp_i_vt005', '2023-02-06 00:00:00', 30000.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt006', 'imp_c_yoosuf', 'VT006', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 180000.00, 194000.00, 14000.00, 1.9384, 4.0125, '2023-02-28 00:00:00', '2023-04-28 00:00:00', NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt006_01', 'imp_i_vt006', '2023-02-28 00:00:00', -180000.00, 'BANK', NULL, now()),
  ('imp_t_vt006_02', 'imp_i_vt006', '2023-04-28 00:00:00', 194000.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt007', 'imp_c_yoosuf', 'VT007', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 200000.00, 214000.00, 14000.00, 2.1684, 3.2282, '2023-05-24 00:00:00', '2023-07-29 00:00:00', NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt007_01', 'imp_i_vt007', '2023-05-24 00:00:00', -200000.00, 'BANK', NULL, now()),
  ('imp_t_vt007_02', 'imp_i_vt007', '2023-07-29 00:00:00', 214000.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt008', 'imp_c_yoosuf', 'VT008', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 165600.00, 178000.00, 12400.00, 2.2341, 3.3517, '2023-06-09 00:00:00', '2023-08-16 00:00:00', NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt008_01', 'imp_i_vt008', '2023-06-09 00:00:00', -165600.00, 'BANK', NULL, now()),
  ('imp_t_vt008_02', 'imp_i_vt008', '2023-08-16 00:00:00', 178000.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt009', 'imp_c_yoosuf', 'VT009', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 278000.00, 297500.00, 19500.00, 2.0370, 3.4436, '2023-08-16 00:00:00', '2023-10-17 00:00:00', NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt009_01', 'imp_i_vt009', '2023-08-16 00:00:00', -278000.00, 'BANK', NULL, now()),
  ('imp_t_vt009_02', 'imp_i_vt009', '2023-10-17 00:00:00', 297500.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt010', 'imp_c_yoosuf', 'VT010', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 200000.00, 212000.00, 12000.00, 2.0041, 4.2719, '2024-11-26 00:00:00', '2025-01-26 00:00:00', NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt010_01', 'imp_i_vt010', '2024-11-26 00:00:00', -200000.00, 'BANK', NULL, now()),
  ('imp_t_vt010_02', 'imp_i_vt010', '2024-12-31 00:00:00', 100000.00, 'BANK', NULL, now()),
  ('imp_t_vt010_03', 'imp_i_vt010', '2025-01-05 00:00:00', 50000.00, 'BANK', NULL, now()),
  ('imp_t_vt010_04', 'imp_i_vt010', '2025-01-26 00:00:00', 62000.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt011', 'imp_c_yoosuf', 'VT011', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 200000.00, 216000.00, 16000.00, 2.3326, 3.9918, '2024-12-04 00:00:00', '2025-02-13 00:00:00', NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt011_01', 'imp_i_vt011', '2024-12-04 00:00:00', -200000.00, 'BANK', NULL, now()),
  ('imp_t_vt011_02', 'imp_i_vt011', '2025-01-26 00:00:00', 50000.00, 'BANK', NULL, now()),
  ('imp_t_vt011_03', 'imp_i_vt011', '2025-02-02 00:00:00', 100000.00, 'BANK', NULL, now()),
  ('imp_t_vt011_04', 'imp_i_vt011', '2025-02-13 00:00:00', 66000.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt012', 'imp_c_yoosuf', 'VT012', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 183000.00, 197640.00, 14640.00, 3.5154, 2.3111, '2024-12-29 00:00:00', '2025-04-15 00:00:00', NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt012_01', 'imp_i_vt012', '2024-12-29 00:00:00', -183000.00, 'BANK', NULL, now()),
  ('imp_t_vt012_02', 'imp_i_vt012', '2025-04-12 00:00:00', 100000.00, 'BANK', NULL, now()),
  ('imp_t_vt012_03', 'imp_i_vt012', '2025-04-15 00:00:00', 97640.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt013', 'imp_c_yoosuf', 'VT013', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 200000.00, 214000.00, 14000.00, 3.0883, 2.9799, '2025-03-01 00:00:00', '2025-06-03 00:00:00', NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt013_01', 'imp_i_vt013', '2025-03-01 00:00:00', -200000.00, 'BANK', NULL, now()),
  ('imp_t_vt013_02', 'imp_i_vt013', '2025-05-04 00:00:00', 150000.00, 'BANK', NULL, now()),
  ('imp_t_vt013_03', 'imp_i_vt013', '2025-06-03 00:00:00', 64000.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt014', 'imp_c_yoosuf', 'VT014', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 200000.00, 214000.00, 14000.00, 3.7125, 2.1532, '2025-03-13 00:00:00', '2025-07-04 00:00:00', NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt014_01', 'imp_i_vt014', '2025-03-13 00:00:00', -200000.00, 'BANK', NULL, now()),
  ('imp_t_vt014_02', 'imp_i_vt014', '2025-06-03 00:00:00', 50000.00, 'BANK', NULL, now()),
  ('imp_t_vt014_03', 'imp_i_vt014', '2025-06-19 00:00:00', 84000.00, 'BANK', NULL, now()),
  ('imp_t_vt014_04', 'imp_i_vt014', '2025-07-04 00:00:00', 80000.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt015', 'imp_c_yoosuf', 'VT015', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 200000.00, 214000.00, 14000.00, 4.7639, 1.6421, '2025-03-20 00:00:00', '2025-08-12 00:00:00', '214,000 for 2 months', now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt015_01', 'imp_i_vt015', '2025-03-20 00:00:00', -200000.00, 'BANK', NULL, now()),
  ('imp_t_vt015_02', 'imp_i_vt015', '2025-07-20 00:00:00', 70000.00, 'BANK', NULL, now()),
  ('imp_t_vt015_03', 'imp_i_vt015', '2025-07-31 00:00:00', 120000.00, 'BANK', NULL, now()),
  ('imp_t_vt015_04', 'imp_i_vt015', '2025-08-12 00:00:00', 24000.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt016', 'imp_c_yoosuf', 'VT016', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 200000.00, 220000.00, 20000.00, 6.2423, 1.9746, '2025-04-15 00:00:00', '2025-10-22 00:00:00', '220,000 for 3 months', now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt016_01', 'imp_i_vt016', '2025-04-15 00:00:00', -200000.00, 'BANK', NULL, now()),
  ('imp_t_vt016_02', 'imp_i_vt016', '2025-08-12 00:00:00', 51000.00, 'BANK', NULL, now()),
  ('imp_t_vt016_03', 'imp_i_vt016', '2025-08-19 00:00:00', 50000.00, 'BANK', NULL, now()),
  ('imp_t_vt016_04', 'imp_i_vt016', '2025-10-15 00:00:00', 50000.00, 'BANK', NULL, now()),
  ('imp_t_vt016_05', 'imp_i_vt016', '2025-10-22 00:00:00', 69000.00, 'BANK', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt017', 'imp_c_yoosuf', 'VT017', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 200000.00, 220000.00, 20000.00, 8.0493, 1.3480, '2025-05-15 00:00:00', '2026-01-15 00:00:00', '220,000 for 3 months', now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt017_01', 'imp_i_vt017', '2025-05-15 00:00:00', -200000.00, 'BANK', NULL, now()),
  ('imp_t_vt017_02', 'imp_i_vt017', '2025-12-15 00:00:00', 90000.00, 'BANK', 'Reinvested into VT024', now()),
  ('imp_t_vt017_03', 'imp_i_vt017', '2025-12-25 00:00:00', 50000.00, 'BANK', 'Reinvested into VT025', now()),
  ('imp_t_vt017_04', 'imp_i_vt017', '2026-01-15 00:00:00', 80000.00, 'BANK', 'Reinvested into VT026', now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt018', 'imp_c_yoosuf', 'VT018', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 149600.00, 164500.00, 14900.00, 8.5421, 1.3307, '2025-06-17 00:00:00', '2026-03-04 00:00:00', '164,500 for 3 months', now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt018_01', 'imp_i_vt018', '2025-06-17 00:00:00', -149600.00, 'BANK', NULL, now()),
  ('imp_t_vt018_02', 'imp_i_vt018', '2026-01-15 00:00:00', 80000.00, 'BANK', 'Reinvested into VT026', now()),
  ('imp_t_vt018_03', 'imp_i_vt018', '2026-02-17 00:00:00', 65000.00, 'CASH', NULL, now()),
  ('imp_t_vt018_04', 'imp_i_vt018', '2026-03-04 00:00:00', 19500.00, 'CASH', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt019', 'imp_c_yoosuf', 'VT019', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 200000.00, 220000.00, 20000.00, 7.1294, 1.4631, '2025-08-21 00:00:00', '2026-03-26 00:00:00', '220,000 for 3 months', now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt019_01', 'imp_i_vt019', '2025-08-21 00:00:00', -200000.00, 'BANK', NULL, now()),
  ('imp_t_vt019_02', 'imp_i_vt019', '2026-03-04 00:00:00', 81500.00, 'CASH', NULL, now()),
  ('imp_t_vt019_03', 'imp_i_vt019', '2026-03-26 00:00:00', 138500.00, 'CASH', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt020', 'imp_c_yoosuf', 'VT020', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 100000.00, 110000.00, 10000.00, 6.5708, 1.5219, '2025-09-07 00:00:00', '2026-03-26 00:00:00', '110,000 for 3 months', now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt020_01', 'imp_i_vt020', '2025-09-07 00:00:00', -100000.00, 'BANK', NULL, now()),
  ('imp_t_vt020_02', 'imp_i_vt020', '2026-03-26 00:00:00', 110000.00, 'CASH', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt021', 'imp_c_yoosuf', 'VT021', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 140000.00, 154000.00, 14000.00, 7.6222, 1.3791, '2025-09-19 00:00:00', '2026-05-09 00:00:00', '154,000 for 3 months', now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt021_01', 'imp_i_vt021', '2025-09-19 00:00:00', -140000.00, 'BANK', NULL, now()),
  ('imp_t_vt021_02', 'imp_i_vt021', '2026-03-26 00:00:00', 500.00, 'CASH', NULL, now()),
  ('imp_t_vt021_03', 'imp_i_vt021', '2026-04-13 00:00:00', 40000.00, 'CASH', NULL, now()),
  ('imp_t_vt021_04', 'imp_i_vt021', '2026-04-26 00:00:00', 40000.00, 'CASH', NULL, now()),
  ('imp_t_vt021_05', 'imp_i_vt021', '2026-05-09 00:00:00', 73500.00, 'CASH', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt022', 'imp_c_yoosuf', 'VT022', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 50000.00, 55000.00, 5000.00, 6.9322, 1.4425, '2025-10-10 00:00:00', '2026-05-09 00:00:00', '55,000 for 3 months', now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt022_01', 'imp_i_vt022', '2025-10-10 00:00:00', -50000.00, 'BANK', NULL, now()),
  ('imp_t_vt022_02', 'imp_i_vt022', '2026-05-09 00:00:00', 55000.00, 'CASH', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt023', 'imp_c_yoosuf', 'VT023', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 69000.00, 75900.00, 6900.00, 6.5380, 1.5295, '2025-10-22 00:00:00', '2026-05-09 00:00:00', '75,900 for 3 months', now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt023_01', 'imp_i_vt023', '2025-10-22 00:00:00', -69000.00, 'BANK', NULL, now()),
  ('imp_t_vt023_02', 'imp_i_vt023', '2026-05-09 00:00:00', 75900.00, 'CASH', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt024', 'imp_c_yoosuf', 'VT024', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 90000.00, 99000.00, 9000.00, 4.9281, 2.0640, '2025-12-15 00:00:00', '2026-05-14 00:00:00', '99,000 for 3 months', now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt024_01', 'imp_i_vt024', '2025-12-15 00:00:00', -90000.00, 'BANK', NULL, now()),
  ('imp_t_vt024_02', 'imp_i_vt024', '2026-05-09 00:00:00', 45600.00, 'CASH', NULL, now()),
  ('imp_t_vt024_03', 'imp_i_vt024', '2026-05-14 00:00:00', 53400.00, 'CASH', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt025', 'imp_c_yoosuf', 'VT025', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 50000.00, 55000.00, 5000.00, 4.5996, 2.1741, '2025-12-25 00:00:00', '2026-05-14 00:00:00', '55,000 for 3 months', now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt025_01', 'imp_i_vt025', '2025-12-25 00:00:00', -50000.00, 'BANK', NULL, now()),
  ('imp_t_vt025_02', 'imp_i_vt025', '2026-05-14 00:00:00', 55000.00, 'CASH', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt026', 'imp_c_yoosuf', 'VT026', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 160000.00, 176000.00, 16000.00, 3.9097, 2.5578, '2026-01-15 00:00:00', '2026-05-14 00:00:00', '176,000 for 3 months', now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt026_01', 'imp_i_vt026', '2026-01-15 00:00:00', -160000.00, 'BANK', NULL, now()),
  ('imp_t_vt026_02', 'imp_i_vt026', '2026-05-14 00:00:00', 176000.00, 'CASH', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_vt027', 'imp_c_yoosuf', 'VT027', 'VARIABLE', 'OPEN', 'CURRENCY', 'LKR', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-10-07 00:00:00', NULL, NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_vt027_01', 'imp_i_vt027', '2026-10-07 00:00:00', -200000.00, 'BANK', NULL, now()),
  ('imp_t_vt027_02', 'imp_i_vt027', '2026-10-26 00:00:00', -800000.00, 'BANK', NULL, now());

-- Hostingate
INSERT INTO "Company" ("id","name","notes","updatedAt") VALUES ('imp_c_hostingate', 'Hostingate', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_host001', 'imp_c_hostingate', 'HOST001', 'FIXED', 'CLOSED', 'CURRENCY', 'LKR', NULL, 3.6000, 500000.00, 554000.00, 54000.00, 3.4497, 3.6000, '2025-05-05 00:00:00', '2025-08-18 00:00:00', NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_host001_01', 'imp_i_host001', '2025-05-05 00:00:00', -500000.00, 'BANK', NULL, now()),
  ('imp_t_host001_02', 'imp_i_host001', '2025-06-07 00:00:00', 18000.00, 'BANK', 'Profit', now()),
  ('imp_t_host001_03', 'imp_i_host001', '2025-07-14 00:00:00', 18000.00, 'BANK', 'Profit', now()),
  ('imp_t_host001_04', 'imp_i_host001', '2025-08-18 00:00:00', 18000.00, 'BANK', 'Profit', now()),
  ('imp_t_host001_05', 'imp_i_host001', '2025-08-18 00:00:00', 500000.00, 'BANK', 'Principal returned', now());

-- Razani
INSERT INTO "Company" ("id","name","notes","updatedAt") VALUES ('imp_c_razani', 'Razani', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_fzm001', 'imp_c_razani', 'FZM001', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 800000.00, 913000.00, 113000.00, 6.3737, 2.6841, '2022-02-01 00:00:00', '2022-08-14 00:00:00', NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_fzm001_01', 'imp_i_fzm001', '2022-02-01 00:00:00', -500000.00, 'BANK', NULL, now()),
  ('imp_t_fzm001_02', 'imp_i_fzm001', '2022-04-03 00:00:00', -300000.00, 'BANK', NULL, now()),
  ('imp_t_fzm001_03', 'imp_i_fzm001', '2022-03-31 00:00:00', 40000.00, 'BANK', 'Profit', now()),
  ('imp_t_fzm001_04', 'imp_i_fzm001', '2022-05-20 00:00:00', 30000.00, 'BANK', 'Profit', now()),
  ('imp_t_fzm001_05', 'imp_i_fzm001', '2022-07-08 00:00:00', 20000.00, 'BANK', 'Profit', now()),
  ('imp_t_fzm001_06', 'imp_i_fzm001', '2022-08-14 00:00:00', 23000.00, 'BANK', 'Profit', now()),
  ('imp_t_fzm001_07', 'imp_i_fzm001', '2022-08-14 00:00:00', 800000.00, 'BANK', 'Principal returned', now());

-- Nasrina
INSERT INTO "Company" ("id","name","notes","updatedAt") VALUES ('imp_c_nasrina', 'Nasrina', NULL, now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_spicy001', 'imp_c_nasrina', 'SPICY001', 'VARIABLE', 'CLOSED', 'CURRENCY', 'LKR', NULL, NULL, 1400000.00, 1531200.00, 131200.00, 7.3593, 1.4853, '2022-08-31 00:00:00', '2023-04-12 00:00:00', NULL, now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_spicy001_01', 'imp_i_spicy001', '2022-08-31 00:00:00', -1400000.00, 'BANK', NULL, now()),
  ('imp_t_spicy001_02', 'imp_i_spicy001', '2022-10-20 00:00:00', 43200.00, 'BANK', 'Profit (September)', now()),
  ('imp_t_spicy001_03', 'imp_i_spicy001', '2022-12-10 00:00:00', 88000.00, 'BANK', 'Profit (October and November)', now()),
  ('imp_t_spicy001_04', 'imp_i_spicy001', '2023-02-05 00:00:00', 400000.00, 'BANK', 'Returned', now()),
  ('imp_t_spicy001_05', 'imp_i_spicy001', '2023-04-12 00:00:00', 1000000.00, 'BANK', 'Returned', now());

-- LOLC
INSERT INTO "Company" ("id","name","notes","updatedAt") VALUES ('imp_c_lolc', 'LOLC', 'Bank Wakala', now());
INSERT INTO "Investment" ("id","companyId","codeName","type","status","assetType","currency","profitCurrency","fixedRatePerMonth","totalPrincipal","totalReturned","profitAmount","durationMonths","monthlyProfitPercent","openedAt","closedAt","notes","updatedAt") VALUES ('imp_i_lolc001', 'imp_c_lolc', 'LOLC001', 'FIXED', 'OPEN', 'CURRENCY', 'LKR', NULL, 1.0833, NULL, NULL, NULL, NULL, NULL, '2026-04-10 00:00:00', NULL, '13% per annum fixed | 2 years from 10.04.2026', now());
INSERT INTO "Transaction" ("id","investmentId","date","amount","method","note","updatedAt") VALUES
  ('imp_t_lolc001_01', 'imp_i_lolc001', '2026-04-10 00:00:00', -2000000.00, 'BANK', NULL, now());

COMMIT;
