import api from './utils/api';
import { createAsyncAction } from './utils/asyncUtils';
import { LOGIN } from '../constants/actionTypes';

const login = (data) => (
  createAsyncAction(LOGIN, () => api.postAsync('/api/login', data))
);

export default {
  login
};
