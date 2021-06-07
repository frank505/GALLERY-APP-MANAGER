import { Response, Request } from "express";

export default class ValidationException 
{ 
    public status:number;
    public success:boolean;
    public message:any;
    public data?:any; 
    
  constructor(status:number,success:boolean,message:any,data?:any)
  {
  
      this.status = status;
      this.success = success;
      this.message = message; 
      this.data = data;
  }


}