import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const createUser = async (user) => {
    await prisma.users.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password,
        },
    });
};
