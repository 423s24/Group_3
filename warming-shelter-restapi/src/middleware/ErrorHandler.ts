import { NextFunction, Request, Response } from "express";

/**
 * Handles errors in the server application.
 * @param err The error to handle.
 * @param req The request.
 * @param res The response.
 * @param next The next function.
 */
export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const status = res.statusCode ? res.statusCode : 500;

    res.status(status);

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack // Only show the stack trace in development for security reasons.
    })
}