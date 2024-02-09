import { Router } from 'express';
import UserController from '../controllers/UserController';
import AccessControl from "../middleware/AccessControl";

import dotenv from "dotenv";
dotenv.config();

const userRouter = Router();

// Login Route
userRouter.post('/login', UserController.loginUser);

// Logout Route
userRouter.get('/logout', UserController.logoutUser);

// Create New User Route
userRouter.post('/create', AccessControl.verifyToken, AccessControl.containsRole(["system_administrator"]), UserController.createNewUser);

// Get All Users Route
userRouter.get('/all', AccessControl.verifyToken, AccessControl.containsRole(["system_administrator"]), UserController.getAllUsers);

// Update User by ID Route
userRouter.put('/update', AccessControl.verifyToken, AccessControl.containsRole(["system_administrator"]), UserController.updateUserById);

// Delete User by ID Route
userRouter.delete('/delete/:id', AccessControl.verifyToken, AccessControl.containsRole(["system_administrator"]), UserController.deleteUserById);

// Get User by ID Route
userRouter.get('/get', AccessControl.verifyToken, AccessControl.containsRole(["system_administrator"]), UserController.getUserById);

// Search Users Route
userRouter.get('/search', AccessControl.verifyToken, AccessControl.containsRole(["system_administrator"]), UserController.searchUsers);

// Development Route (only available in development mode)
const devMode = process.env.NODE_ENV === "development";
if (devMode) {
    userRouter.get('/create-dev-user', UserController.createDevUser);
}

export default userRouter;