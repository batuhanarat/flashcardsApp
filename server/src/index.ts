import {config} from "dotenv";
config();

import mongoose from "mongoose";
import express,{Request,Response} from "express";
import Sensor from "./models/Sensor";
import User from "./models/User";
import cors from "cors";
import Deck from "./models/Deck";

const PORT = 5001;
const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());

app.post("/decks", async (req:Request, res: Response) => {
    const newDeck = new Deck({
        title: req.body.title
    })
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
});

app.get("/decks", async (req:Request, res: Response) => {
    const decks = await Deck.find();
    res.json(decks);
});


mongoose.connect(process.env.MONGO_URL!).then( () => {
    app.listen(PORT);
});




