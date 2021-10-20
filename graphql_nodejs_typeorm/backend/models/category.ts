import { Entity, BaseEntity, PrimaryGeneratedColumn, Column,OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Product } from "./product";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  pr_id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(type => [Product],{nullable:true})
  @OneToMany(() => Product, productParticipants => productParticipants.sub_product)
  productParticipants?: [Product];
 
}
