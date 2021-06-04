import { Response, Request } from "express";

export default class CustomResponseHelper
{
  

    public setHttpResponse = (status:number,res:Response,
      success:boolean,
      message:string | any,data?:Object | null, errors?:Object )=>
    {
      res.status(status).send({
        success:success,
        response:message,
        data:data,
      })      
    }

  
}