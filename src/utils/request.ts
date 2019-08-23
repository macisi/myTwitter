import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.twitter.com',
});
instance.interceptors.response.use(
  res => {
    console.log(res);
    return res.data;
  },
  err => Promise.reject(err)
);

export default instance;
