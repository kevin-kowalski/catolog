import dotenv from 'dotenv';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/user.model';

// Set the NODE_ENV variable to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load environment variables from the appropriate .env file
const envFileName = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

dotenv.config({ path: envFileName });

// Retrieve the JWT secret from the corresponding environment variable
const JWT_SECRET = process.env.JWT_SECRET;

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    // Try to retrieve user from database by email
    const existingUser = await findUserByEmail(email);

    // Ensure user exists
    if (existingUser) {
      res.status(409);
      res.send({ message: 'User already exists' });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user, using the user model’s createUser function
    const user = await createUser(email, hashedPassword);

    // Send the response back to the client
    res.status(201);
    res.send({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error in user registration', error);
    res.status(500);
    res.send({ message: 'Internal server error' });
  }
};

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      res.status(401);
      res.send({ message: 'Invalid credentials' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401);
      res.send({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200);
    res.send({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error in user login', error);
    res.status(500);
    res.send({ message: 'Internal server error' });
  }
};