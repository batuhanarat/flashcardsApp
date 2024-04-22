import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const ImageDataSchema = new Schema({
    imageId: {type: ObjectId},
    image: { type: String},
    userId: {type: Number},
    date: { type: Date, default: Date.now }
});

const ImageDataModel =  mongoose.model(
    "ImageData", ImageDataSchema
);

export default ImageDataModel;
