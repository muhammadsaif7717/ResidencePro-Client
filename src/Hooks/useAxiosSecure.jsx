import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";


export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOutUser } = useAuth()


    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            // console.log('Error tracked in the interceptor', error.response);
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                // console.log('Logout the user');
                logOutUser()
                    .then(() => {
                        navigate('/sign-in')
                    })
                    .catch(error => console.log(error))
            }
        });
    }, [logOutUser, navigate])


    return axiosSecure;
};

export default useAxiosSecure;