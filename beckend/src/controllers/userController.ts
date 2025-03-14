import { Request, Response } from 'express';
import User from '../models/User';
import { clerkClient } from '@clerk/express';

// Controller to get users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const {users, clients} = await clerkClient;
    res.json({user : users, client : clients});
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Controller to create a new user
export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create user' });
  }
};
