import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1]; // Get token from headers
    if (!token) return res.status(401).json({ message: "Access denied. No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
