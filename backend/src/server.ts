import express ,{Request,Response} from 'express';
import multer from "multer";
import "reflect-metadata";
import { upload } from './multerInstance';
import Routes  from './routes';
import * as helmet from "helmet";
import * as cors from "cors";
import * as dotenv from 'dotenv';
import { connection } from './database/databaseConnection';
import {pagination} from 'typeorm-pagination'




class Server
{

    private app: express.Application;
    private routes:Routes;
   private multerInstance:any;

    constructor()
    {
        
            this.app = express();
            this.configuration();
           this.routes = new Routes(this.app);    
  
       
    
        
    }


    public configuration()
    {
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(cors.default());
        this.app.use(helmet.default());
        this.app.use(upload);  
        this.app.use(pagination);
    }

  

    public start()
    {
        this.app.listen(this.app.get('port'), ()=>
        {
            console.log('Server is listening '+this.app.get('port'));
        })
    }

}

dotenv.config();
connection().then(()=>{
    const server = new Server();
    server.start();
});

