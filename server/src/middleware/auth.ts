import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

interface AuthRequest extends Request {
  user?: JwtPayload;
}

const SECRET_KEY = process.env.JWT_SECRET_KEY || '';  // secret key

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // The token is extracted from the authHeader and split to remove the 'bearer' prefix if it exist.
  
  // Verify the token exists and add the user data to the request object
  if(!token){
    return res.status(401).json({message: "Access Denied. No Token Provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(403).json({message: 'Failed to authenticate token'});
  }

};
