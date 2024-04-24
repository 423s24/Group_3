import { Router } from 'express';
import LockerController from '../controllers/LockerController';
import AccessControl from "../middleware/AccessControl";

import dotenv from "dotenv";
dotenv.config();

const lockerRouter = Router();

// Update Locker by Number Route
lockerRouter.put('/update', LockerController.updateLockerByNumber);

// Get All Locker Route
lockerRouter.get('/all', LockerController.getAllLocker);

lockerRouter.get('/numbers', LockerController.getNumbers);

export default lockerRouter