import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Bunk from '../models/Bunk';

class BunkController {

    public static updateBunkByNumber = asyncHandler(async (req: Request, res: Response) => {
        const { number, name } = req.body;

        if (!number) {
            res.status(400);
            throw new Error('Please provide bunk number');
        }

        const foundBunk = await Bunk.findOne({bunkNumber: number});

        console.log(foundBunk)

        if (!foundBunk) {
            res.status(404);
            throw new Error('Bunk not found');
        }

        foundBunk.bunkOccupant = name;
        const updatedBunk = await foundBunk.save();

        if(updatedBunk){
            res.status(200).send('Bunk updated successfully');
        } else {
            res.status(500);
            throw new Error('Guest update failed');
        }
    })

    public static getAllBunks = asyncHandler(async (req: Request, res: Response) => {
        const bunks = await Bunk.find({});

        const allBunks = bunks.map(bunk => ({
            number: bunk.bunkNumber,
            name: bunk.bunkOccupant,
            men: bunk.isMen,
            women: bunk.isWomen,
            observation: bunk.isObservation
        }))

        if (allBunks) {
            res.status(200).json({
                bunks: allBunks,
            });
        } else {
            res.status(500);
            throw new Error('No bunks found');
        }
    })
}

export default BunkController