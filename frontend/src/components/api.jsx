import axios from 'axios';

const baseURL = 'http://localhost:8080';
const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('userEmail');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

const UserData = (email) => {
    console.log(email);
    axios.get(`http://localhost:8083/api/users/email/${email}`);
}

const UpdateUserByID = (id, data) => axiosInstance.put(`/api/users/update/${id}`, data)
const DeleteUserByID = (id) => axiosInstance.delete(`/api/users/delete/${id}`)
const CreateUser = (name, email, phone, address, password) => axiosInstance.post(`/user/add`, { name, email, phone, address, password });
//Admin
const getAllUsers = () => axiosInstance.get('/api/users/all')

export { axiosInstance, CreateUser, UserData, UpdateUserByID, getAllUsers, DeleteUserByID }
