import { Column, 
     Entity,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   UpdateDateColumn } from "typeorm";

@Entity('gallery')
export class GalleryEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
 public title?: string;
  
  @Column()
 public  image?: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
public created_at?: Date;

@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
public updated_at?: Date;

}