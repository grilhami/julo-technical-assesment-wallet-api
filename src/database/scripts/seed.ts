import { PrismaClient, User } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

const seed = async () => {
	const data: User = {
        customer_xid: "ea0212d3-abd6-406f-8c67-868e814a2436",
        customer_name: "Awesome Customer",
		token: "cb04f9f26632ad602f14acef21c58f58f6fe5fb55a"
	};
    console.log(`User Created with Id ${data.customer_xid}`)
	await prisma.user.create({data});
	await prisma.$disconnect();
};

seed();