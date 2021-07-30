import { Router } from 'express';
import auth from '../../middleware/auth';

// Item Model
import Masker from '../../models/Masker';

const router = Router();

// @route   GET api/masker
// @desc    Get All Items
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const masker = await Masker.find();
    if (!masker) throw Error('No classifications found!');

    res.status(200).json(masker);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// @route   POST api/masker
// @desc    Post an Item
// @access  Private
router.post('/', auth, (req, res) => {
  const newItem = new Masker({
    description: req.body.description,
    accuracy: req.body.accuracy
  });

  newItem.save().then((masker) => res.json(masker));
});

export default router;
