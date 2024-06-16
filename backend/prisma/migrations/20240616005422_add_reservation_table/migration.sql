-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('CREDITO', 'DEBITO');

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "cvv" INTEGER NOT NULL,
    "expiryDate" TEXT NOT NULL,
    "type" "CardType" NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotelier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hotel_name" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,

    CONSTRAINT "Hotelier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublishedReservation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "num_rooms" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "num_people" INTEGER NOT NULL,
    "wifi" BOOLEAN NOT NULL,
    "breakfast" BOOLEAN NOT NULL,
    "parking" BOOLEAN NOT NULL,
    "airConditioning" BOOLEAN NOT NULL,
    "roomService" BOOLEAN NOT NULL,
    "promotionId" INTEGER,
    "hotelierId" INTEGER NOT NULL,

    CONSTRAINT "PublishedReservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "num_rooms" INTEGER NOT NULL,
    "checkin" TEXT NOT NULL,
    "checkout" TEXT NOT NULL,
    "num_adults" INTEGER NOT NULL,
    "num_children" INTEGER NOT NULL,
    "paymentMethodName" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "publishedReservationId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "paymentMethodId" INTEGER NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Hotelier_email_key" ON "Hotelier"("email");

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublishedReservation" ADD CONSTRAINT "PublishedReservation_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "promotion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublishedReservation" ADD CONSTRAINT "PublishedReservation_hotelierId_fkey" FOREIGN KEY ("hotelierId") REFERENCES "Hotelier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_publishedReservationId_fkey" FOREIGN KEY ("publishedReservationId") REFERENCES "PublishedReservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
