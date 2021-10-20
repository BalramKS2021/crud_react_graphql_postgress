import { Entity, BaseEntity, PrimaryGeneratedColumn, Column,ManyToOne,JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Category } from './category';


@ObjectType()
@Entity()
export class Product extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string;
  
    @Field(() => String)
    @Column()
    name: string;
  
    @Field(() => Number)
    @Column()
    product_id: Number;

    @Field(type => Category)
    @ManyToOne(() => Category, category => category.productParticipants)
    @JoinColumn({name: 'product_id'})
    sub_product: Category;


}