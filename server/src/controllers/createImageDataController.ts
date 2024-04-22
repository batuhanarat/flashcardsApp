import { Request, Response } from "express";
import ImageDataModel from "../models/ImageData";
import * as formidable from 'formidable';

export async function  createImageDataController(req: Request, res: Response) {

        const {base64} = req.body;
        try {
            ImageDataModel.create({image:base64})
            res.send({Status: "ok"});
        } catch (error) {
            res.send({Status: "error" , data:error})
        }
    }


