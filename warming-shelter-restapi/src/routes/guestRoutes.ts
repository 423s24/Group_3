import { Router } from 'express';
import GuestController from '../controllers/GuestController';
import AccessControl from "../middleware/AccessControl";

import dotenv from "dotenv";
dotenv.config();

const guestRouter = Router();

// Get All Guests Route
guestRouter.get('/all', GuestController.getAllGuests);

// Get One Guest by ID Route
guestRouter.get('/viewProfile/:id', GuestController.viewProfile);

// Get All Current Guests Route
guestRouter.get('/current', GuestController.getCurrentGuests);

// Update Guest by ID Route
guestRouter.put('/update', GuestController.updateGuestById);

// Create new guest object
guestRouter.post('/new', GuestController.makeNewGuest);

// Get all guests who have bunk reservations
guestRouter.get('/reservation', GuestController.getBunkReservations);

export default guestRouter;