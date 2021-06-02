import { GalleryController } from './controllers/GalleryController'; 
import express from 'express';
import { galleryValidationRules, validateGalleryErrMessage } from './validators/GalleryValidator';




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
    app.get('/api/gallery/get',this.gallery.index);
    app.post('/api/gallery/create', 
    galleryValidationRules(),validateGalleryErrMessage, this.gallery.create);
    app.put('/api/update/:id',this.gallery.update);
    app.delete('/api/delete/:id',this.gallery.delete);
  }


}