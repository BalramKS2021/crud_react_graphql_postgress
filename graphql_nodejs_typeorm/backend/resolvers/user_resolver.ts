import { Resolver, Query,Mutation,Arg } from "type-graphql";
import { Users } from '../models/users';
import { Product } from '../models/product';
import { Category } from '../models/category';

import {CreateUserInput} from '../inputs/create_user_input'
import {CreateProductInput} from '../inputs/CreateProductInput'
import {UpdateProductInput} from '../inputs/UpdateProductInput'
import {UpdateUserInput} from '../inputs/UpdateUserInput'


@Resolver()
export class UserResolver {

  @Query(() => String)
  hello() {
    return "world";
  }

  //All users
  @Query(() => [Users])
  users() {
    return Users.find();
  }

  //Add user
  @Mutation(() => Users)
  async createUser(@Arg("data") data: CreateUserInput) {
  const user = Users.create(data);
  await user.save();
  return user;
  }

  //Delete User by id
  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string) {
    const user = await Users.findOne({ where: { id } });
    if (!user) throw new Error("user not found!");
    await user.remove();
    return true;
  }

  //Get Product By id
  @Query(() => Users)
  user(@Arg("id") id: string) {
    return Users.findOne({ where: { id } });
  }
  
  //Update User By id
  @Mutation(() => Users)
  async updateUser(@Arg("id") id: string, @Arg("data") data: UpdateUserInput) {
    const user = await Users.findOne({ where: { id } });
    if (!user) throw new Error("user not found!");
    Object.assign(user, data);
    await user.save();
    return user;
  }

  // For Products
    //Get All Product
    
    // @Query(() => [Product])
    // allProducts() {
    //   return Product.find();
    // }
  
    //Get Product By id
    @Query(() => Product)
    product(@Arg("id") id: string) {
      return Product.findOne({ where: { id } });
    }
  
    //Add Product
    @Mutation(() => Product)
    async createProduct(@Arg("data") data: CreateProductInput) {
      const product = Product.create(data);
      await product.save();
      return product;
    }
  
    //Update Product By id
    @Mutation(() => Product)
    async updateProduct(@Arg("id") id: string, @Arg("data") data: UpdateProductInput) {
      const product = await Product.findOne({ where: { id } });
      if (!product) throw new Error("product not found!");
      Object.assign(product, data);
      await product.save();
      return product;
    }
  
    //Delete Product by id
    @Mutation(() => Boolean)
    async deleteProduct(@Arg("id") id: string) {
      const product = await Product.findOne({ where: { id } });
      if (!product) throw new Error("product not found!");
      await product.remove();
      return true;
    }

    //Showing data of product categories and main product
  @Query(() => [Category])
  async AllProducts() {
    
    // const products_categories= Category.find();
    const products_categories = Category.find({
      // where:{
      //   active:true
      // },
      relations:['productParticipants']
    });

    /*let experiecesData = await this.Product.find({
      where: {
        id: value.pr_id
      },
      relations: ['productParticipants']
    })*/
    return products_categories;
  }
  // AllProduct(@Arg("id") id: string) {
  //   return Products.findOne({ where: { id } });
  // }

}