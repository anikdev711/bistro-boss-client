/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({ item }) => {

    const {
        name,
        recipe,
        image,
        price,
        _id
    } = item

    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axios = useAxiosSecure();
    const [cart, refetch] = useCart();

    const handleAddToCart = (food) => {
        console.log(food);
        if (user && user.email) {
            //to do something
            console.log(user.email, food);
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }

            axios.post('/carts', cartItem)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                })
                .catch(error => {
                    console.log(error);
                })


        }
        else {

            Swal.fire({
                title: "You are not logged in",
                text: "At first login to add cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Swal.fire({
                    //     title: "Deleted!",
                    //     text: "Your file has been deleted.",
                    //     icon: "success"
                    // });
                    navigate('/login', { state: { from: location } });
                }
            });

        }

    }

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={image} alt="" /></figure>
                <p className="absolute bg-slate-900 text-white font-extrabold right-0 mr-4 mt-4 px-4 rounded-2xl">${price}</p>
                <div className="card-body flex flex-col items-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                        <button onClick={() => handleAddToCart(item)}
                            className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;