import { Router } from 'express';
import auth from '../../middleware/auth';

// User Model
import User from '../../models/User';

const router = Router();

/**
 * @route   GET api/users
 * @desc    Get all users
 * @access  Private
 */

router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    if (!users) throw Error('No users exist');
    res.json(users);
  } catch (e) {
    res.status(400).json({
      status: "error",
      msg: e.message,
    });
  }
});

export default router;