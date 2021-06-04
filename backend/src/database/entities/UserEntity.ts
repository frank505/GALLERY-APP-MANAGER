import { Column, 
    Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn 
 } from "typeorm";

@Entity('users')
export class UserEntity {
    
 @PrimaryGeneratedColumn('increment')
 public id?: number;

 @Column('varchar',{nullable:false})
public name?: string;
 
 @Column('varchar',{nullable:false,unique:true})
public  email?: string;

@Column('varchar',{nullable:false})
public  password?: string;

 @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
public created_at?: Date;

@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
public updated_at?: Date;

}