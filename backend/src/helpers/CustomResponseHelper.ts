import { Response, Request } from "express";

export default class CustomResponseHelper
{
    public setHttpResponse(status:number,res:Response,message:string,data?:Object | null )
    {
      res.status(status).send({
        message:message,
        data:data
      })      
    }

  
}