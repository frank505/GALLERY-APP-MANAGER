import { Response, Request } from "express";

export default interface ICustomResponseHelper{
    
    setHttpResponse(
        status:number,res:Response,
            success:boolean,
            message:string | any,data?:Object | null, errors?:Object   
    ):Response<any>
}