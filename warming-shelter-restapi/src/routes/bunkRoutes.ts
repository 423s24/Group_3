import { Router } from 'express';
import BunkController from '../controllers/BunkController';
import AccessControl from "../middleware/AccessControl";

import dotenv from "dotenv";
dotenv.config();

const bunkRouter = Router();

// Update Bunk by Number Route
bunkRouter.put('/update', BunkController.updateBunkByNumber);

// Get All Bunk Route
bunkRouter.get('/all', BunkController.getAllBunks);

export default bunkRouter