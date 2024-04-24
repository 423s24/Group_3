import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Locker from '../models/Locker';

class LockerController {

    public static updateLockerByNumber = asyncHandler(async (req: Request, res: Response) => {
        const { number, name } = req.body;

        if (!number) {
            res.status(400);
            throw new Error('Please provide locker number');
        }

        console.log(number)

        const foundLocker = await Locker.findOne({lockerNumber: number});

        console.log(foundLocker)

        if (!foundLocker) {
            console.log("not found")
            res.status(404);
            throw new Error('Locker not found');
        }

        foundLocker.lockerOccupant = name;
        const updatedLocker = await foundLocker.save();

        if(updatedLocker){
            res.status(200).send('Locker updated successfully');
        } else {
            res.status(500);
            throw new Error('Locker update failed');
        }
    })

    public static getAllLocker = asyncHandler(async (req: Request, res: Response) => {
        const lockers = await Locker.find({});

        const allLockers = lockers.map(locker => ({
            number: locker.lockerNumber,
            name: locker.lockerOccupant,
        }))

        if (allLockers) {
            res.status(200).json({
                lockers: allLockers,
            });
        } else {
            res.status(500);
            throw new Error('No lockers found');
        }
    })

    public static getNumbers = asyncHandler(async (req: Request, res: Response) => {
        const lockers = await Locker.find({});

        const allLockers = lockers.map(locker => ({
            number: locker.lockerNumber,
            name: locker.lockerOccupant,
        }))

        if (allLockers) {
            let filledCount = 0;
            let emptyCount = 0;

            for (const locker of lockers) {
                if (locker.lockerOccupant && locker.lockerOccupant.trim() !== "") {
                    filledCount++;
                } else {
                    emptyCount++;
                }
            }
            
            console.log(filledCount, emptyCount)
            res.status(200).json({
                filledCount: filledCount,
                emptyCount: emptyCount,
            });
        } else {
            res.status(500);
            throw new Error('No lockers found');
        }
    })


}

export default LockerController