// import axios from 'axios';

// const instance = axios.create();

// instance.defaults.withCredentials = true;
// instance.defaults.baseURL = 'http://localhost:5050';

// instance.interceptors.request.use(
//   (config) => {
//     const token = JSON.parse(localStorage.getItem('token'));
//     const accessToken = token.token;

//     if (!accessToken) {
//       window.location.href = '/login';
//       return config;
//     }

//     config.headers['Content-Type'] = 'application/json';
//     config.headers['Authorization'] = `Bearer ${accessToken}`;

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );