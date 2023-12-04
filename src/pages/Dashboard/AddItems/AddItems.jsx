import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa6";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`





const AddItems = () => {
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = {
            image: data.image[0]
        }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })

        if (res.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to database`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }


        console.log(res.data);
    }
    return (
        <div>
            <SectionTitle heading="add an item" subHeading="what's new?">

            </SectionTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <label>First Name</label> */}
                {/* <input {...register("firstName")} /> */}
                {/* <label>Gender Selection</label> */}

                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Recipe Name*</span>
                    </label>
                    <input
                        type="text"
                        {...register('name', { required: true })}
                        placeholder="Recipe name"
                        className="input input-bordered w-full" />
                </div>

                <div className="flex gap-6">

                    {/* category  */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Category*</span>
                        </label>
                        <select defaultValue="default" {...register("category", { required: true })}
                            className="select select-bordered w-full">
                            <option disabled value="default">Select the category</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drinks">Drinks</option>
                        </select>
                    </div>

                    {/* price  */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Price*</span>
                        </label>
                        <input
                            type="number"
                            {...register('price', { required: true })}
                            placeholder="Price"
                            className="input input-bordered w-full" />
                    </div>




                </div>

                {/* Recipe details  */}
                <div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe details*</span>
                        </label>
                        <textarea
                            {...register('recipe', { required: true })}
                            className="textarea textarea-bordered h-24" placeholder="Recipe details"></textarea>
                    </div>
                </div>

                {/* file  */}

                <div className="form-control w-full my-6">
                    <input
                        {...register('image', { required: true })}
                        type="file"
                        className="file-input w-full max-w-xs" />
                </div>

                <div>
                    <button className="btn btn-neutral">
                        Add Item <FaUtensils className="ml-4" />
                    </button>
                </div>













                {/* <select {...register("category")}
                    className="select select-bordered w-full">
                    <option disabled selected>Select the category</option>
                    <option value="salad">Salad</option>
                    <option value="pizza">Pizza</option>
                    <option value="soup">Soup</option>
                    <option value="dessert">Dessert</option>
                    <option value="drinks">Drinks</option>
                </select> */}


                {/* <input type="submit" /> */}
            </form>

        </div>
    );
};

export default AddItems;