-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "owned_by" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "enabled_at" TEXT,
    "disabled_at" TEXT,
    "balance" INTEGER NOT NULL
);
