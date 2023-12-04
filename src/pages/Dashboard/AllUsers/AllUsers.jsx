import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";


const AllUsers = () => {

    const axios = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get('/users'
                // ,{
                //     headers: {
                //         authorization: `Bearer ${localStorage.getItem('access-token')}`
                //     }
                // }
            );
            return res.data;
        }
    });


    const handleMakeAdmin = (user) => {
        axios.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleDeleteUser = (user) => {
        console.log(user._id);



        // Swal.fire({
        //     title: "Are you sure?",
        //     text: "You won't be able to revert this!",
        //     icon: "warning",
        //     showCancelButton: true,
        //     confirmButtonColor: "#3085d6",
        //     cancelButtonColor: "#d33",
        //     confirmButtonText: "Yes, delete it!"
        // }).then((result) => {
        //     if (result.isConfirmed) {

        //         axios.delete(`/users/${user._id}}`)
        //             .then(res => {
        //                 // console.log(res);
        //                 if (res.data.deletedCount > 0) {
        //                     refetch();
        //                     Swal.fire({
        //                         title: "Deleted!",
        //                         text: "Your file has been deleted.",
        //                         icon: "success"
        //                     });
        //                 }
        //             })
        //             .catch(error => {
        //                 console.log(error);
        //             })
        //     }
        // });


        // ============================Solved by using fetch============
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://bistro-boss-server-kappa-three.vercel.app/users/${user._id}`, {
                    method: 'DELETE',
                    headers: {
                        "content-type": "application/json"
                    },

                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });






    }



    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>

            {/* table */}

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.role === 'admin' ? 'Admin' : <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn btn-lg bg-orange-500">
                                            <FaUsers className="text-white text-2xl"></FaUsers>
                                        </button>}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="btn btn-ghost btn-lg">
                                            <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>




        </div>
    );
};

export default AllUsers;