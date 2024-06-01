import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    // withCredentials: true,
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOutUser } = useAuth()


    //request interceptors
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        config.headers.Authorization = `Bearer ${token}`;
        // console.log('request stopped by interceptors')
        return config;
    }, function (err) {
        return Promise.reject(err);
    });

    // interceptors response
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (err) => {
        const status = err.response.status;
        // console.log('Status error in the interceptors', status)
        if (status === 401 || status === 403) {
            await logOutUser();
            navigate('/sign-in')
        }
        return Promise.reject(err);
    });


    return axiosSecure;
};

export default useAxiosSecure;