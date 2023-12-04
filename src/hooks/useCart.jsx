import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
// import { useContext } from "react";
import useAuth from "./useAuth";


const useCart = () => {
    const axios = useAxiosSecure();
    const { user } = useAuth();
    const {
        refetch,
        data: cart = []
    } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axios.get(`/carts?email=${user?.email}`);
            console.log(res);
            console.log(res.data);
            return res.data;
        }
    });
    return [cart, refetch];

};

export default useCart;