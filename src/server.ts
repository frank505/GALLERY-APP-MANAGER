import express ,{Request,Response} from 'express';
import { GalleryController } from './controllers/GalleryController'; // import the Gallery controller
import { createConnection } from "typeorm";


class Server
{

    private app: express.Application;
    private GalleryController: GalleryController;

    constructor()
    {
        this.app = express();
        this.configuration();
        this.GalleryController = new GalleryController();
        this.routes();

    }

    public configuration()
    {
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(express.json());
    }

    public async routes()
    {
        await createConnection(
            {
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "Gallerygres",
            password: "password",
            database: "gallery_app",
            entities: ["build/database/entities/**/*.js"],
            synchronize: true,
            name: "gallery_app",
            migrationsTableName:"migrations_table",
            migrations: ["build/database/migration/**/*.js"],
            cli:{
                migrationsDir:"migration"
            }
          }
          );  
      
          this.app.get( "/", (req: Request, res: Response ) => {
            res.send( "Hello world!" );
          });
      
          this.app.use(`/api/gallery/`,this.GalleryController.router); // Configure the new routes of the controller Gallery
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