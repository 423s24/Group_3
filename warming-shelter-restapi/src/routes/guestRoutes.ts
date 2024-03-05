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

export default guestRouter;