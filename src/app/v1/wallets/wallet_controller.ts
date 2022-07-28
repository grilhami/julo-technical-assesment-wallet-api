import { Request, Response, Router } from "express";
import { IController } from "../../../shared/interfaces";
import WalletService from "./wallet_service";
import { IInitWallet} from "../../../shared/interfaces/wallet";
import { IErrorResponse, ISuccessResponse } from "../../../shared/interfaces/response";
import { Wallet } from "@prisma/client";

export default class WalletController implements IController {
	path = "/wallet";
	router = Router();
    walletService: WalletService

    constructor() {
        this.initRoutes();
        this.walletService = new WalletService()
    }

    initRoutes() {
		this.router.post(`/init`, this.initWallet);
        this.router.post(`${this.path}`, this.postWallet);
        this.router.get(`${this.path}`, this.getWallet);
        this.router.patch(`${this.path}`, this.patchtWallet);
	}

    private initWallet = async (req: Request, res: Response) => {
        const wallet: IInitWallet = req.body;
        console.log(req.body)
        try {
            const token: string = await this.walletService.createWallet(wallet.customer_xid)
            const response: ISuccessResponse = {
                status: "success",
                data: {
                    token
                }
            }
            return res.status(201).json(response)
        } catch(e) {
            console.log(e)
            const response: IErrorResponse = {
                status: "error",
                message: "Internal Server"
            }
            return res.status(500).json(response)
        }
    }

    private postWallet = async (req: Request, res: Response) => {
        let token: string = req.headers.authorization as string;
        token = token.replace("Token ", "")
        try {
            const wallet: Wallet = await this.walletService.enableWallet(token)
            const response: ISuccessResponse = {
                status: "success",
                data: {
                    wallet
                }
            }
            return res.status(201).json(response)
        } catch(e) {
            console.log(e)
            const response: IErrorResponse = {
                status: "error",
                message: "Internal Server"
            }
            return res.status(500).json(response)
        }
    }

    private getWallet = async (req: Request, res: Response) => {
        let token: string = req.headers.authorization as string;
        token = token.replace("Token ", "")
        try {
            const wallet: Wallet = await this.walletService.getWalletByToken(token)
            const response: ISuccessResponse = {
                status: "success",
                data: {
                    wallet
                }
            }
            return res.status(201).json(response)
        } catch(e) {
            console.log(e)
            const response: IErrorResponse = {
                status: "error",
                message: "Internal Server"
            }
            return res.status(500).json(response)
        }
    }

    private patchtWallet = async (req: Request, res: Response) => {
        let token: string = req.headers.authorization as string;
        token = token.replace("Token ", "")
        try {
            const wallet: Wallet = await this.walletService.disableWallet(token)
            const response: ISuccessResponse = {
                status: "success",
                data: {
                    wallet
                }
            }
            return res.status(201).json(response)
        } catch(e) {
            console.log(e)
            const response: IErrorResponse = {
                status: "error",
                message: "Internal Server"
            }
            return res.status(500).json(response)
        }
    }
}