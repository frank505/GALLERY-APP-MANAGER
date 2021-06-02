import { EntityRepository, Repository } from "typeorm";
import { GalleryEntity } from "../database/entities/GalleryEntity";

@EntityRepository(GalleryEntity)

export class GalleryRepository extends Repository<GalleryEntity>
{

}