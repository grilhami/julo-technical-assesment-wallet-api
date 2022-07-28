export interface ISuccessResponse {
    status: string;
    data: any;
}

export interface IFailResponse {
    status: string;
    data: Record<string,string>;
}
  
export interface IErrorResponse {
    status: string;
    data: string;
}