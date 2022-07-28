import { PrismaClient, Wallet, User } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

interface IWalletService {
    prisma: PrismaClient
    createWallet(id: string): Promise<string>
    enableWallet(token: string): Promise<Wallet>
    disableWallet(token: string): Promise<Wallet>
    getWalletByToken(token: string): Promise<Wallet>
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

    enableWallet= async (token: string): Promise<Wallet> => {
        const user: User = await this.prisma.user.findFirstOrThrow({
            where: {
                token
            }
        })
        const wallet: Wallet= await this.prisma.wallet.findFirstOrThrow({
            where: { owned_by:user.customer_xid }
        });

        if (wallet.status === "enabled") 
            throw new Error("Wallet already enabled")

        const data: Wallet = await this.prisma.wallet.update(
            {
                where: { id: wallet.id },
                data: {
                    status: "enabled",
                    enabled_at: new Date().toISOString()
                }
            }
        )

        return data
    }

    disableWallet= async (token: string): Promise<Wallet> => {
        const user: User = await this.prisma.user.findFirstOrThrow({
            where: {
                token
            }
        })
        const wallet: Wallet= await this.prisma.wallet.findFirstOrThrow({
            where: { owned_by:user.customer_xid }
        });
        if (wallet.status === "disabled") 
            throw new Error("Wallet already disabled")

        const data: Wallet = await this.prisma.wallet.update(
            {
                where: { id: wallet.id },
                data: {
                    status: "disabled",
                    disabled_at: new Date().toISOString()
                }
            }
        )

        return data
    }

    getWalletByToken = async (token: string): Promise<Wallet> =>  {
        const user: User = await this.prisma.user.findFirstOrThrow({
            where: {
                token
            }
        })

        const wallet: Wallet = await this.prisma.wallet.findFirstOrThrow({
            where: {
                owned_by: user.customer_xid
            }
        });
        return wallet
    }
}

export default WalletService;