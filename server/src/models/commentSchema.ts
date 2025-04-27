import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    commentId: { type: String, required: true },
    browserId: { type: String, required: true },
    description: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

export const Comment = mongoose.model('Comment', CommentSchema);
