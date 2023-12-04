import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axios = useAxiosSecure();
    const handleDelete = (id) => {
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

                axios.delete(`/carts/${id}`)
                    .then(res => {
                        console.log(res);
                        refetch();
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        });
    }

    return (
        <div>
            <div className="flex justify-evenly mb-10">
                <h3 className="text-3xl">Items: {cart.length}</h3>
                <h3 className="text-3xl">Items: {totalPrice}</h3>
                
                {cart.length ? <Link to="/dashboard/payment">
                    <button className="btn btn-primary text-white">Pay</button>
                </Link>
                    : <button disabled className="btn btn-primary text-white">Pay</button>

                }
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                cart.map((item, index) => (
                                    <tr key={item._id}>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item.image} alt="" />
                                                    </div>
                                                </div>

                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <div className="font-bold">
                                                    {item.name}
                                                </div>

                                            </div>
                                        </td>
                                        <td>${item.price}</td>
                                        <th>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="btn btn-ghost btn-lg">
                                                <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                            </button>
                                        </th>
                                    </tr>
                                ))
                            }



                            {/* row 1 */}


                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cart;