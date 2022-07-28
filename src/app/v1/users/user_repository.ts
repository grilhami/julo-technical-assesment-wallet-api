import { PrismaClient, User } from "@prisma/client";

interface IUserRepository {
    prisma: PrismaClient
    findUserById(id: string): Promise<User>
}

class UserRepository implements IUserRepository{
    prisma = new PrismaClient()
    findUserById = async (id: string): Promise<User>  => {
        return await this.prisma.user.findUniqueOrThrow({
            where: {
                customer_xid:id
            }
        })
    }
}

export default UserRepository;