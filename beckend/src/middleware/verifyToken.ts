import { i } from "@clerk/clerk-react/dist/useAuth-D-mOWUVF";
import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";


export const verifyToken = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const {token} = req.cookies;

    try {

        console.log("===============> " ,token)
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET as string);
        
        if (!decodedToken) {
            res.status(401).json({
                success: false,
                message: "Unauthorized - Invalid token",
            });
            return;
        }

        req.userId = decodedToken.userId; // Attach user ID to request object

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

})