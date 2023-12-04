// import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const useMenu = () => {
    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //     fetch('https://bistro-boss-server-kappa-three.vercel.app/menu')
    //         .then(res => res.json())
    //         .then(data => {
    //             setMenu(data);
    //             setLoading(false);
    //         })
    // }, [])

    // using tenstack query 
    const axiosPublic = useAxiosPublic();
    const {
        data: menu = [],
        isPending: loading,
        refetch
    } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosPublic.get('/menu');
            console.log(res.data);
            return res.data;
        }
    })


    return [menu, loading, refetch];
};

export default useMenu;