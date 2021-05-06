import { Router, Response, Request } from "express";
import {PostService} from '../services/postService';


export class PostController 
{
public router:Router;
private postService:PostService;

constructor()
{
    this.router = Router();
    this.postService = new PostService();
}


public async index(req:Request,res:Response)
{
   res.send(this.postService.index());
}

public async create(req:Request,res:Response)
{
   res.send(this.postService.create());
}


public async update(req:Request,res:Response)
{
   res.send(this.postService.update());
}

public async delete(req:Request,res:Response)
{
   res.send(this.postService.delete());
}


}