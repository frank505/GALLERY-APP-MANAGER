import { Router } from "express";
import { GalleryController } from "../controllers/GalleryController";
import {
    CreateGalleryErr,
    CreateGalleryRules,
   UpdateGalleryErr,
   UpdateGalleryRules
   } from '../middleware/validators/AllValidators';

const Gallery = new GalleryController();

const router = Router();


router.post("/create-gallery",CreateGalleryRules(),CreateGalleryErr, Gallery.create);
router.get("/list-gallery", Gallery.index);
router.patch('/update-gallery/:id',UpdateGalleryRules(),UpdateGalleryErr, Gallery.update);
router.delete('/delete/:id',Gallery.delete);

export default router;