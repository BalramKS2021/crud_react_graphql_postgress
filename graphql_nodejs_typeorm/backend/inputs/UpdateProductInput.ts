import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  name?: string;
}
