import { Request, Response } from 'express';
import NewUserService from '../services/createNewUser';
import logger from '../utils/logger';

class StaffController {
  // Register a new user
  async register(req: Request, res: Response) {
    try {

    if (!req.user) {
      console.log('Inside staff controller: User not authenticated');
        logger.error('User not authenticated', { label: 'AccountController' });
    return res.status(400).json({ message: 'User not authenticated' });
    }
    const userId = req.user.id;
      const result = await NewUserService.register(userId, req.body);
      return res.status(result.status).json({ message: result.message });
    } catch (error: any) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

export default new StaffController();