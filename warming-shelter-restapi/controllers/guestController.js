const asyncHandler = require('express-async-handler');
const Guest = require('../models/Guest');

const getAllGuests = asyncHandler(async (req, res) => {
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

const viewProfile = asyncHandler(async (req, res) => {
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
                laundry: foundGuest.laundry,
                bx_warning: foundGuest.Bx.warning,
                bx_suspension: foundGuest.Bx.suspension,
                bx_noTrespass: foundGuest.Bx.noTrespass,
                bx_probation: foundGuest.Bx.probation,
                bx_bxNotes: foundGuest.Bx.bxNotes
            }
        });
    } else {
        res.status(500);
        throw new Error('Guest not found');
    }
});

const getCurrentGuests = asyncHandler(async (req, res) => {
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


    if (currentGuests) {
        res.status(200).json({
            guests: currentGuests,
        });
    } else {
        res.status(500);
        throw new Error('No guests found');
    }
});

const updateGuestById = asyncHandler(async (req, res) => {
    const { id, profile } = req.body;

    if (!id) {
        res.status(400);
        throw new Error('Please provide guest id');
    }

    const foundGuest = await Guest.findById(id);

    if (!foundGuest) {
        res.status(404);
        throw new Error('Guest not found');
    }

    foundGuest.firstName = profile.firstName;
    foundGuest.lastName = profile.lastName;
    foundGuest.DOB = profile.dob;
    foundGuest.isActive = profile.isActive;
    foundGuest.consecutiveDaysStayed = profile.consecutiveDaysStayed;
    foundGuest.latestCheckInDate = profile.latestCheckInDate;
    foundGuest.HMIS.isValid = profile.hmis_isValid;
    foundGuest.HMIS.enterDate = profile.hmis_date;
    foundGuest.accommodation.hasAcc = profile.has_accommodation;
    foundGuest.accommodation.accDesc = profile.desc_accommodation;
    foundGuest.bunkReservation.hasRes = profile.has_bunk_reservation;
    foundGuest.bunkReservation.resNum = profile.bunk_reservation_number;
    foundGuest.locker = profile.locker;
    foundGuest.laundry = profile.laundry;
    foundGuest.Bx.warning = profile.bx_warning;
    foundGuest.Bx.suspension = profile.bx_suspension;
    foundGuest.Bx.noTrespass = profile.bx_noTrespass;
    foundGuest.Bx.probation = profile.bx_probation;
    foundGuest.Bx.bxNotes = profile.bx_bxNotes

    const updatedGuest = await foundGuest.save();

    if (updatedGuest) {
        res.status(200).json({
            guest: {
                firstName: updatedGuest.firstName,
                lastName: updatedGuest.lastName,
                DOB: updatedGuest.DOB,
                has_accommodation: updatedGuest.accommodation.hasAcc,
                desc_accommodation: updatedGuest.accommodation.accDesc
            }
        });
    } else {
        res.status(500);
        throw new Error('Guest update failed');
    }
});

const makeNewGuest = asyncHandler(async (req, res) => {
    const { profile } = req.body;

    const newGuest = await Guest.insertMany({
        firstName: profile.firstName,
        lastName: profile.lastName,
        dob: null,
        isActive: true,
        consecutiveDaysStayed: 1,
        latestCheckInDate: new Date(),
        HMIS: {
            isValid: false,
            enterDate: null
        },
        accommodation: {
            hasAcc: false,
            accDesc: null
        },
        bunkReservation: {
            hasRes: false,
            resNum: null
        },
        locker: null,
        laundry: false,
        Bx: {
            warning: false,
            suspension: false,
            noTrespass: false,
            probation: false,
            bxNotes: null
        }
    })

    if (newGuest) {
        res.status(200).json({
            value: "success"
        })
    } else {
        res.status(500);
        throw new Error('Guest update failed');
    }
});

const getBunkReservations = asyncHandler(async (req, res) => {
    const guests = await Guest.find({ "bunkReservation.hasRes": true })

    const reservationGuests = guests.map(guest => ({
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


    if (reservationGuests) {
        res.status(200).json({
            guests: reservationGuests,
        });
    } else {
        res.status(500);
        throw new Error('No reservations found');
    }
});

module.exports = {
    getAllGuests,
    viewProfile,
    getCurrentGuests,
    updateGuestById,
    makeNewGuest,
    getBunkReservations
};