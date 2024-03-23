import {config} from "dotenv";
config();

import mongoose from "mongoose";
import express,{Request,Response} from "express";
import Sensor from "./models/Sensor";
import User from "./models/User";

const PORT = 5001;
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("hello world");
});

app.get("/hello", (req: Request, res: Response) => {
    res.send("hello ");
});

app.post("/sensors", async (req:Request, res: Response) => {
    const newSensor = new Sensor({
        temperature: req.body.temperature,
        humidity: req.body.humidity,
        ligthIntensity: req.body.ligthIntensity,
        co2Level: req.body.co2Level
    })
    const createdSensor = await newSensor.save();
    res.json(createdSensor);
});

app.post("/users", async (req:Request, res: Response) => {
    const newUser = new User({
        temperature: req.body.temperature,
        humidity: req.body.humidity,
        ligthIntensity: req.body.ligthIntensity,
        co2Level: req.body.co2Level
    })
    const createdUser = await newUser.save();
    res.json(createdUser);
});

app.post("/decks", async (req:Request, res: Response) => {
    const newDeck = new User({
        title: req.body
    })
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
});


mongoose.connect(process.env.MONGO_URL!).then( () => {
    app.listen(PORT);
});




