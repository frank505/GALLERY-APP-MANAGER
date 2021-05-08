import express ,{Request,Response} from 'express';
import "reflect-metadata";
import Routes  from './routes';



class Server
{

    private app: express.Application;
    private routes:Routes;

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
    }

  

    public start()
    {
        this.app.listen(this.app.get('port'), ()=>
        {
            console.log('Server is listening');
        })
    }

}

const server = new Server();
server.start();