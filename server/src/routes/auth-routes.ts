import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const {username, password} = req.body;

  try {
    const user = await User.findOne({where: {username}});
    if(!user){
      return res.status(401).json({message: 'Invalid username or password'});
    }

    //Comparing the password with the stored hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword){
      return res.status(401).json({message: 'Invalid username or password'});
    }

    // Generate a JWT token
    const token = jwt.sign({userId: user.id, username: user.username}, SECRET_KEY, {expiresIn: '1h'});
    return res.json({success: true, token});
  } catch (error: any) {
    return res.status(500).json({message: 'Internal Server Error'});
    
  }


};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
