import express, { Request, Response } from 'express';
import { Comment } from '../models/commentSchema';

const router = express.Router();

// GET all comment
router.get('/', async (_req: Request, res: Response) => {
  try {
    console.log('GET /comments');
    const comments = await Comment.find();
    res.json(comments);
    return;
  } catch (err) {
    console.error('GET /comments failed:', err);
    res.status(500).json({ error: 'Server error' });
    return;
  }
});

// POST create a comment
router.post('/', async (req: Request, res: Response) => {
  try {
    console.log('POST /comments', req.body);
    const { commentId, browserId, description, lng, lat } = req.body;

    if (!commentId || !browserId || !description || lng == null || lat == null) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const comment = new Comment({
      commentId,
      browserId,
      description,
      lng,
      lat
    });

    await comment.save();
    res.status(201).json({ message: 'Comment saved', comment });
    return;
  } catch (err) {
    console.error('POST /comments failed:', err);
    res.status(500).json({ error: 'Server error' });
    return;
  }
});

// DELETE a comment by commentId
router.delete('/:commentId', async (req: Request<{ commentId: string }>, res: Response) => {
  try {
    console.log('DELETE /comments/:commentId', req.params);
    const { commentId } = req.params;

    const deletedComment = await Comment.findOneAndDelete({ commentId });

    if (!deletedComment) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    res.json({ message: 'Comment deleted', comment: deletedComment });
    return;
  } catch (err) {
    console.error('DELETE /comments/:commentId failed:', err);
    res.status(500).json({ error: 'Server error' });
    return;
  }
});

// GET comments by browserId
router.get(
  '/by-browserId/:browserId',
  async (req: Request<{ browserId: string }>, res: Response) => {
    try {
      console.log('GET /comments/by-browserId/:browserId', req.params);
      const { browserId } = req.params;

      const comments = await Comment.find({ browserId })
        .lean()
        .select('commentId browserId description lat lng -_id');

      res.json(comments);
      return;
    } catch (err) {
      console.error('GET /comments/by-browserId/:browserId failed:', err);
      res.status(500).json({ error: 'Server error' });
      return;
    }
  }
);

export default router;
