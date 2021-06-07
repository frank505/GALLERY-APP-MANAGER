export interface CreateUserValidationInterface{
    name:string,
     email:string,
     password:string
  }

  export interface CreateUserResponseInterface
  {
      success:boolean,
      error:any;
  }