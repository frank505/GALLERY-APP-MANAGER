export interface LoginUserValidationInterface{
     email:string,
     password:string
  }

  export interface LoginUserResponseInterface
  {
      success:boolean,
      error:any;
  }