import express ,{Request,Response} from 'express';
import multer from "multer";
import "reflect-metadata";
import { upload } from './multerInstance';
import Routes  from './routes';




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
        this.app.use(upload);  
    }

  

    public start()
    {
        this.app.listen(this.app.get('port'), ()=>
        {
            console.log('Server is listening '+this.app.get('port'));
        })
    }

}

const server = new Server();
server.start();