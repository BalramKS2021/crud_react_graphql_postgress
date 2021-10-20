import { Resolver, Query,Mutation,Arg } from "type-graphql";
import { Users } from '../models/users';

import {CreateUserInput} from '../inputs/create_user_input'
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

}