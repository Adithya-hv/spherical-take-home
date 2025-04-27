import axios from 'axios';
import type { CommentData } from '../stores/popupStore';

// BASE_URL should not include path, just domain
const BASE_URL = import.meta.env.VITE_BASE_URL;
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getCommentsByBrowserId = async (browserId: string) => {
  try {
    // REST API:
    // https://www.youtube.com/watch?v=P0a7PwRNLVU
    // GET /comments?browserId=browserId
    // add type commentData[]
    const response = await api.get<CommentData[]>(`/by-browserId/${browserId}`);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.info('No comments yet for this browserId:', browserId);
      return []; // handle new users
    }
    console.error('Error fetching comments:', error);
    throw error;
  }
};

const addComment = async (commentData: CommentData) => {
  try {
    // POST /comments
    const response = await api.post('/', commentData);
    return response.data; // Return the response message and comment
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

const deleteComment = async (commentId: string) => {
  try {
    // /comments/:comment_id
    const response = await api.delete(`/${commentId}`);
    return response.data; // Return the response message
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

export default {
  getCommentsByBrowserId,
  addComment,
  deleteComment,
};
