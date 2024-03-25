import {config} from "dotenv";
config();

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { deleteCardFromDeckController } from "./controllers/deleteCardFromDeckController";

const PORT = 5001;
const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());

app.post("/decks", createDeckController);
app.get("/decks", getDecksController);
app.delete("/decks/:deckId" ,deleteDeckController);

app.post("/decks/:deckId/cards", createCardForDeckController);
app.get("/decks/:deckId", getDeckController);
app.delete("/decks/:deckId/:index", deleteCardFromDeckController)


mongoose.connect(process.env.MONGO_URL!).then( () => {
    app.listen(PORT);
});




