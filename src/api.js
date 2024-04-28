import axios from 'axios';
import { server } from './constants/config.js';

const createInstance = (headers) => {
  return axios.create({
    baseURL: `${server}`,
    withCredentials: true,
    headers: headers,
  });
};

const api = {
  loginUser: async (userName, password) => {
    const instance = createInstance({
      'Content-type': 'application/json',
    });
    try {
      const { data } = await instance.post('/api/v1/user/login', {
        userName,
        password,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  registerUser: async (formData) => {
    const instance = createInstance({
      'Content-type': 'multipart/form-data',
    });
    try {
      const { data } = await instance.post('/api/v1/user/signup', formData);
      return data;
    } catch (error) {
      throw error;
    }
  },

  getProfileUser : async () => {
    const instance = createInstance()
    try{
        const {data} = await instance.get('/api/v1/user/profile')
        return data
    }catch(error){
        throw error
    }
  },

  getUserLogout: async () => {
     const instance = createInstance();
     try {
       const { data } = await instance.get('/api/v1/user/logout');
       return data;
     } catch (error) {
       throw error;
     }
  }
};

export default api;
