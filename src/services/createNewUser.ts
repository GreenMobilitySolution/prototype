import User from '../models/User';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
import AuthService from '../services/authService';

interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  role?: string;
  phone?: string;
  department?: string;
}

interface LoginUserInput {
  email: string;
  password: string;
}

class NewUserService {
  // Register a new user
  async register(userId: string, input: RegisterUserInput) {
    try {
      const { department, name, email, password, role: inputRole, phone } = input;

      // Check if a user with the same email already exists
      const existingUserByEmail = await AuthService.findByEmail(email);
      if (existingUserByEmail) {
        return { status: 400, message: 'User with this email already exists' };
      }

      // Check if a user with the same phone number already exists
      if (phone) {
        const existingUserByPhone = await AuthService.findByPhoneNumber(phone);
        if (existingUserByPhone) {
          return { status: 400, message: 'User with this phone number already exists' };
        }
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const role = inputRole || 'Passenger';

      const newUser = new User({
        name,
        email,
        department,
        password: hashedPassword,
        role,
        profileImage: '',
        phone: phone || '',
      });

      // Save the user to the database
      await newUser.save();

      return { status: 200, message: 'User added successfully'};
    } catch (error: any) {
      logger.error('Error registering user: %o', error);
      return { status: 500, message: 'Network error. Try again later.', error: error.message };
    }
  }
}

export default new NewUserService();