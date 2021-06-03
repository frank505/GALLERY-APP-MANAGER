import { GalleryController } from './controllers/GalleryController'; 
import express from 'express';
import routes from './routes/index';




export default class Routes
{

    private gallery:GalleryController;

  constructor(app:express.Application)
  { 
    this.gallery = new GalleryController();
    this.routeList(app);
  }

 
  

  routeList(app:express.Application)
  {
    app.use('/api',routes);
  }


}