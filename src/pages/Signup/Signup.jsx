// import { useForm } from "react-hook-form"

import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Signup = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const axios = useAxiosPublic();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                //update profile
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log('user profile updated');
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }

                        axios.post('/users', userInfo)
                            .then(res => {
                                console.log(res);
                                if (res.data.insertedId) {
                                    console.log('user added to database');
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User created successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            })

                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })

    };

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign up</title>
            </Helmet>
            <div>
                <div className="hero min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold">Sign up now!</h1>
                            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        </div>
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("name", { required: true })}
                                        name="name"
                                        placeholder="Your name"
                                        className="input input-bordered" />
                                    {errors.name && <span className="text-red-500">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("photoURL", { required: true })}
                                        name="photoURL"
                                        placeholder="Photo URL"
                                        className="input input-bordered" />
                                    {errors.photoURL && <span className="text-red-500">Photo URL is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        {...register("email", { required: true })}
                                        name="email"
                                        placeholder="Enter your email"
                                        className="input input-bordered" />
                                    {errors.email && <span className="text-red-500">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        {...register("password", {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 20,
                                            pattern: /(?=.*?[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!#$%&? "])/
                                        })}
                                        name="password"
                                        placeholder="Enter your password"
                                        className="input input-bordered" />

                                    {errors.password?.type === "required" && (
                                        <p className="text-red-600" role="alert">password is required</p>
                                    )}
                                    {errors.password?.type === "minLength" && (
                                        <p className="text-red-600" role="alert">password  must be greater than or equal to 6 characters</p>
                                    )}
                                    {errors.password?.type === "maxLength" && (
                                        <p className="text-red-600" role="alert">password is must be less than 20 characters</p>
                                    )}
                                    {errors.password?.type === "pattern" && (
                                        <p className="text-red-600" role="alert">password must have at least one number one uppercase one lower case and one special characters</p>
                                    )}



                                    {/* <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label> */}
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn btn-primary" type="submit" value="Sign up" />
                                </div>
                            </form>
                            <p className="text-center p-8"><small>New here? <Link to="/login">Login</Link> </small></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;