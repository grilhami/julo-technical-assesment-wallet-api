export interface IInitWallet {
    customer_xid: string;
}

export interface IDepositWithdrawal {
    amount: number;
    reference_id: string;
}

export interface IWalletResponseData {
    id: string;
    owned_by: string;
    status: string;
    enabled_at?:string;
    disabled_at?:string;
    balance:number;
}