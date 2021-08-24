import { Router } from 'express';
import auth from '../../middleware/auth';

// Item Model
import Masker from '../../models/Masker';

const router = Router();

// @route   GET api/masker
// @desc    Get All Items
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let query = Masker.find();
    let bermasker = Masker.countDocuments({ 'description': 'Bermasker' })
    let tidakBermasker = Masker.countDocuments({ 'description': 'Tidak Bermasker' })

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await Masker.countDocuments();

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);

    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }

    const result = await query;
    const resultBermasker = await bermasker;
    const resultTidakBermasker = await tidakBermasker;

    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages,
      data: {
        masked: resultBermasker,
        unmasked: resultTidakBermasker,
        result
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
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
