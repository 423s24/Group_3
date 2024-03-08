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
            isActive: guest.isActive,
            consecutiveDaysStayed: guest.consecutiveDaysStayed,
            latestCheckInDate: guest.latestCheckInDate,
            hmis_valid: guest.HMIS.isValid,
            hmis_date: guest.HMIS.enterDate,
            has_accommodation: guest.accommodation.hasAcc,
            desc_accommodation: guest.accommodation.accDesc,
            has_bunk_reservation: guest.bunkReservation.hasRes,
            bunk_reservation_number: guest.bunkReservation.resNum,
            locker: guest.locker,
            laundry: guest.laundry,
            bx_warning: guest.Bx.warning,
            bx_suspension: guest.Bx.suspension,
            bx_noTrespass: guest.Bx.noTrespass,
            bx_probation: guest.Bx.probation,
            bx_bxNotes: guest.Bx.bxNotes
        }));


        if (allGuests) {
            res.status(200).json({
                guests: allGuests,
            });
        } else {
            res.status(500);
            throw new Error('No guests found');
        }
    });

    public static viewProfile = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id) {
            res.status(400);
            throw new Error('Please provide guest id');
        }

        const foundGuest = await Guest.findById(id);

        if (foundGuest) {
            res.status(200).json({
                profile: {
                    id: foundGuest._id,
                    firstName: foundGuest.firstName,
                    lastName: foundGuest.lastName,
                    dob: foundGuest.DOB,
                    isActive: foundGuest.isActive,
                    consecutiveDaysStayed: foundGuest.consecutiveDaysStayed,
                    latestCheckInDate: foundGuest.latestCheckInDate,
                    hmis_valid: foundGuest.HMIS.isValid,
                    hmus_date: foundGuest.HMIS.enterDate,
                    has_accommodation: foundGuest.accommodation.hasAcc,
                    desc_accommodation: foundGuest.accommodation.accDesc,
                    has_bunk_reservation: foundGuest.bunkReservation.hasRes,
                    bunk_reservation_number: foundGuest.bunkReservation.resNum,
                    locker: foundGuest.locker,
                    laundry: foundGuest.laundry
                }
            });
        } else {
            res.status(500);
            throw new Error('Guest not found');
        }
    });

    public static getCurrentGuests = asyncHandler(async (req: Request, res: Response) => {
        const guests = await Guest.find({ isActive: true })

        const currentGuests = guests.map(guest => ({
            id: guest._id,
            firstName: guest.firstName,
            lastName: guest.lastName,
            dob: guest.DOB,
            isActive: guest.isActive,
            consecutiveDaysStayed: guest.consecutiveDaysStayed,
            latestCheckInDate: guest.latestCheckInDate,
            hmis_valid: guest.HMIS.isValid,
            hmus_date: guest.HMIS.enterDate,
            has_accommodation: guest.accommodation.hasAcc,
            desc_accommodation: guest.accommodation.accDesc,
            has_bunk_reservation: guest.bunkReservation.hasRes,
            bunk_reservation_number: guest.bunkReservation.resNum,
            locker: guest.locker,
            laundry: guest.laundry
        }));


        if (currentGuests) {
            res.status(200).json({
                guests: currentGuests,
            });
        } else {
            res.status(500);
            throw new Error('No guests found');
        }
    });
}

export default GuestController;