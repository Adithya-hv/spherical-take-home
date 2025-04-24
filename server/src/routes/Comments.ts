import express, { Request, Response } from 'express';
import { Comment } from '../models/commentSchema';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    console.error('GET /comments failed:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { commentId, browserId, description, lng, lat } = req.body;

    if (!commentId || !browserId || !description || lng == null || lat == null) {
      res.status(400).json({ error: 'Missing required fields' });
    }

    const comment = new Comment({
      commentId,
      browserId,
      description,
      lng,
      lat,
    });

    await comment.save();
    res.status(201).json({ message: 'Comment saved', comment });
  } catch (err) {
    console.error('POST /comments failed:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;

    // Find and remove the comment by commentId
    const deletedComment = await Comment.findOneAndDelete({ commentId });

    if (!deletedComment) {
      res.status(404).json({ error: 'Comment not found' });
    }

    res.json({ message: 'Comment deleted', comment: deletedComment });
  } catch (err) {
    console.error('DELETE /comments failed:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/by-browserId/:browserId', async (req, res) => {
  try {
    const { browserId } = req.params;

    // Find comments that match the given browserId
    const comments = await Comment.find({ browserId })
      .lean()
      .select('commentId browserId description lat lng -_id');

    if (comments.length === 0) {
      res.json([]);
    }

    res.json(comments);
  } catch (err) {
    console.error('GET /comments/by-browserId failed:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
