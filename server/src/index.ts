import express,{Request,Response} from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck";

const PORT = 5001;
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("hello world");
});

app.get("/hello", (req: Request, res: Response) => {
    res.send("hello ");
});

app.post("/decks", async (req:Request, res: Response) => {
    const newDeck = new Deck({
        title: req.body.title
    })
     const createdDeck = await newDeck.save();
     res.json(createdDeck);
});

mongoose.connect("mongodb+srv://flashcardsage:Ceo63MOQ1wdllFFH@cluster0.om99iyf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then( () => {
    app.listen(PORT);
});




