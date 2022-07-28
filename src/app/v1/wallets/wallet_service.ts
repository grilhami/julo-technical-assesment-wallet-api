import { PrismaClient, Wallet, User } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

interface IWalletService {
    prisma: PrismaClient
    createWallet(id: string): Promise<string>
}

class WalletService implements IWalletService{
    prisma = new PrismaClient()
    createWallet = async (id: string): Promise<string>  => {
        const user: User = await this.prisma.user.findUniqueOrThrow({
            where: {
                customer_xid:id
            }
        });

        const data:Wallet = {
            id :uuidv4(),
            owned_by: user.customer_xid,
            status: "disabled",
            enabled_at: null,
            disabled_at: null,
            balance:0
        }

        await this.prisma.wallet.create({data})

        return user.token as string;   
    }
}

export default WalletService;