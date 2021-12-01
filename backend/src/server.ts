import 'reflect-metadata';
import express ,{NextFunction, Request,Response} from 'express';
import multer from "multer";
import routes from './routes/index';
import * as helmet from "helmet";
import * as cors from "cors";
import * as dotenv from 'dotenv';
import { connection } from './database/databaseConnection';
import ValidationException from './middleware/CustomErrorException/ValidationExceptionHandler';
import path from "path";




export default class Server
{

    private app: express.Application;

    constructor()
    {

            this.app = express();
            this.configuration();
    }


    public configuration()
    {
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(cors.default());
        this.app.use(helmet.default());
        this.app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
            if (err instanceof ValidationException) {
              return res.status(err.status).send({success:err.success,message:err.message});
            }
          });
        this.app.use('/img',express.static(path.join(__dirname, 'public/uploads/gallery')));
        this.app.use('/', routes);

    }



    public start()
    {
          if(process.env.NODE_ENV !=='test')
          {
            this.app.listen(this.app.get('port'), ()=>
            {
                console.log('Server is listening '+this.app.get('port'));
            })
          }

    }


    public appInstance = () =>
    {
      return this.app;
    }


}

dotenv.config();
connection().then(()=>{
  const server = new Server();
  return  server.start();
});


