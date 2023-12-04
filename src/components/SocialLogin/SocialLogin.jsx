import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axios = useAxiosPublic();
    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axios.post('/users', userInfo)
                    .then(res => {
                        console.log(res);
                        navigate('/');
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
    }
    return (
        <div className="p-8">
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignIn}
                    className="btn w-full">
                    <FaGoogle></FaGoogle>
                    Google sign in
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;