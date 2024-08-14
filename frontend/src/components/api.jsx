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
        return Promise.reject(error+"ERR");
    }
);

const UserData = (email) => {
    console.log(email);
    axios.get(`http://localhost:8083/api/users/email/${email}`);}
// const UserData = (email) => axiosInstance.get(`/Customers/${email}`);
const UpdateUserByID = (id, data) => axiosInstance.put(`/api/users/update/${id}`, data)
const DeleteUserByID = (id) => axiosInstance.delete(`/api/users/delete/${id}`)
const CreateUser = (name,email,phone,address,password)=>axiosInstance.post(`/user/add`,{name, email, phone, address, password});
//Admin
const getAllUsers = () => axiosInstance.get('/api/users/all')
// const postBooks=(id,name,phone,vehicleNumber,service,problemDescription,date,time,user)=>axiosInstance.post('/api/bookings/post',{id,name,phone,vehicleNumber,service,problemDescription,date,time,user});
export { axiosInstance,CreateUser, UserData, UpdateUserByID, getAllUsers, DeleteUserByID }
