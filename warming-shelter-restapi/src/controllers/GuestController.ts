import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Guest from '../models/Guest';

class GuestController {

    public static getAllGuests = asyncHandler(async (req: Request, res: Response) => {
        const guests = await Guest.find({}).select('-dob');

        const allGuests = guests.map(guest => ({
            id: guest._id,
            firstName: guest.firstName,
            lastName: guest.lastName,
            dob: guest.DOB,
            has_accommodation: guest.accommodation.hasAcc,
            desc_accommodation: guest.accommodation.accDesc,
            has_bunk_reservation: guest.bunkReservation.hasRes,
            bunk_reservation_number: guest.bunkReservation.resNum,
            locker: guest.locker,
            laundry: guest.laundry
        }));


        if (allGuests) {
            res.status(200).json({
                guests: allGuests,
            });
        } else {
            res.status(500);
            throw new Error('No users found');
        }
    });
}

export default GuestController;