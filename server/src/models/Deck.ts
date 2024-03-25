import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const DeckShema = new Schema({
    "title" : String,
    "cards" : [String],
});


const DeckModel = mongoose.model("Deck", DeckShema);

export default DeckModel;
