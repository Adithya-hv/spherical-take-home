import axios from 'axios';
import type { CommentData } from '../stores/popupStore';

const api = axios.create({
  baseURL: 'http://localhost:3000/comments',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  async getCommentsByBrowserId(browserId: string) {
    try {
      const response = await api.get(`/by-browserId/${browserId}`);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.info('No comments yet for this browserId:', browserId);
        return []; // handle new users
      }
      console.error('Error fetching comments:', error);
      throw error;
    }
  },

  async addComment(commentData: CommentData) {
    try {
      console.log('Adding comment to db', commentData);
      const response = await api.post('/', commentData);
      return response.data; // Return the response message and comment
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  },

  async deleteComment(commentId: string) {
    try {
      console.log('Deleting comment from db', commentId);
      const response = await api.delete(`/${commentId}`);
      return response.data; // Return the response message
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  },
};
