import express from 'express';
import { currentUser } from '@meetbe/common';
import { User } from '../../models/userModel';

const router = express.Router();

router.get('/api/users/allusers', currentUser, async (req, res) => {
  const allUsers = await User.find();
  res.status(200).send({ allUsers: allUsers || null });
});
export { router as allUserRouter };
