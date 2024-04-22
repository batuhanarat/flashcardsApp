import { Request, Response } from "express";
import ImageDataModel from "../models/ImageData";

export async function  getImageDataController(req: Request, res: Response) {

        const {base64} = req.body;
        try {
           await ImageDataModel.find({}).then(data => {
                res.send({status: "ok", data: data})
            })

        } catch (error) {
        }
    }


