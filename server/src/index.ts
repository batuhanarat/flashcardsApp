import {config} from "dotenv";
config();

import mongoose from "mongoose";
import express,{Request,Response} from "express";
import Sensor from "./models/Sensor";
import User from "./models/User";
import cors from "cors";
import Deck from "./models/Deck";
import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";

const PORT = 5001;
const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());

app.post("/decks", createDeckController);

app.get("/decks", getDecksController);

app.delete("/decks/:deckId" ,deleteDeckController);


mongoose.connect(process.env.MONGO_URL!).then( () => {
    app.listen(PORT);
});




