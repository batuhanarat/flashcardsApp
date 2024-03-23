import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const UserSchema = new Schema({
   user_id: String,
   device_id: String,
   date : Date
});

const UserModel =  mongoose.model(
    "User", UserSchema
);

export default UserModel;