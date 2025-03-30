import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response  } from "express";
import bcrypt from "bcrypt";
// import errorHandler from "src/middlewares/errorHandler";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try{
  const { email, password } = req.body;
  if (!email || !password) {
    const error: any = new Error('Email and password are required');
    error.statusCode = 400; // Bad Request
    // Pass the error to the middleware
    return next(error);
  }
  if(password.length < 6) {
    const error: any = new Error('Password must be at least 6 characters long');
    error.statusCode = 400; 
    next(error)
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })
  if(user) {
    next(new Error('User already exists'))
  }

  //hashing the password brfore saving in the db
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    },
  });
  res.status(201).json({ message: "User registered successfully", user: { email: createdUser.email } });
  } catch(err:any) {
    console.log('Caught error in registerUser:', err);
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      const error: any = new Error('Email and password are required');
      error.statusCode = 400; // Bad Request
      // Pass the error to the middleware
      return next(error);
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return  next(new Error('User does not exists'))
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new Error('Invalid password'));
    }
    res.status(200).json({ message: "Login successful", user: { email: user.email } });
  } catch (err:any) {
    console.log("Caught error in user login:", err);
    next(err)
  }

};



