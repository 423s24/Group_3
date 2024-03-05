import { Router } from 'express';
import GuestController from '../controllers/GuestController';
import AccessControl from "../middleware/AccessControl";

import dotenv from "dotenv";
dotenv.config();

const guestRouter = Router();

// Get All Users Route
guestRouter.get('/all', GuestController.getAllGuests);
guestRouter.get('/viewProfile/:id', GuestController.viewProfile);
guestRouter.get('/current', GuestController.getCurrentGuests);

export default guestRouter;