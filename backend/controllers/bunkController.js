const asyncHandler = require('express-async-handler');
const Bunk = require('../models/Bunk');

const updateBunkByNumber = asyncHandler(async (req, res) => {
    const { number, name } = req.body;

    if (!number) {
        res.status(400);
        throw new Error('Please provide bunk number');
    }

    const foundBunk = await Bunk.findOne({ bunkNumber: number });

    console.log(foundBunk)

    if (!foundBunk) {
        res.status(404);
        throw new Error('Bunk not found');
    }

    foundBunk.bunkOccupant = name;
    const updatedBunk = await foundBunk.save();

    if (updatedBunk) {
        res.status(200).send('Bunk updated successfully');
    } else {
        res.status(500);
        throw new Error('Guest update failed');
    }
});

const getAllBunks = asyncHandler(async (req, res) => {
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
});

module.exports = {
    getAllBunks,
    updateBunkByNumber
};