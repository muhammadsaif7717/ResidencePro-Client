import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: 'https://bistro-boss-delta.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;