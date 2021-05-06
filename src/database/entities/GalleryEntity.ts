import { Column, 
     Entity,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToOne,
   JoinColumn 
  } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity('gallery')
export class GalleryEntity 
 {
  @PrimaryGeneratedColumn('increment')
  public id?: number;

  @ManyToOne(type => UserEntity, { nullable: true })
  @JoinColumn({name: 'id'})
  public user_id?:number;

  @Column('varchar',{nullable:false})
 public title?: string;
  
  @Column('varchar',{nullable:false})
 public  image?: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
public created_at?: Date;

 @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
 public updated_at?: Date;

 

}