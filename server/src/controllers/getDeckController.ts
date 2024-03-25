import {Request,Response} from "express";
import Deck from "../models/Deck";

export async function getDeckController(req:Request, res: Response) {
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);
    if(!deck) return;
    return res.json(deck);
}