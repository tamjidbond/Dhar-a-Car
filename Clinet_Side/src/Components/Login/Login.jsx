import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, } from "firebase/auth";
import app from "../../Firebase/firebase.init";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import gogoleLogo from "./../../assets/logo/google.png"
import Lottie from "lottie-react";
import loginAnimation from "../../assets/animation/login.json"
import "./Login.css"
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [showPassword, setShowpassword] = useState(false);
    const [password, setPassword] = useState('');
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.getItem('mrRentalLoginToken') && navigate("/")
    }, [navigate])

    const handleShowPassword = () => {
        setShowpassword(!showPassword)
    }

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then(
                res => {
                    localStorage.setItem('mrRentalLoginToken', res._tokenResponse.idToken)
                    navigate("/")
                }

            )
            .catch(
                error => {
                    setErrorMsg(error.message)
                }
            )
    }

    const handleLogin = (e) => {
        setErrorMsg('');
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (password.length < 6) {
            setErrorMsg("Please Enter At Least 6 Charecters");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(
                res => {
                    localStorage.setItem('mrRentalLoginToken', res._tokenResponse.idToken)
                    navigate("/")
                }

            )
            .catch(
                error => {
                    setErrorMsg(error.code)
                }
            )

    }
    return (
        <div>
            <div className="log" >
                <div className="hero min-h-screen bg flex flex-col items-center justify-center" >
                    <h3 className="text-4xl font-bold">Log In</h3>
                    <div>
                        <div className="hero-content flex-col lg:flex-row-reverse">
                            <div className="max-w-44 md:max-w-full text-center lg:text-left lg:flex flex-col items-center hidden md:hidden ">
                                <Lottie animationData={loginAnimation}></Lottie>
                            </div>
                            <div className=" card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                <form onSubmit={handleLogin} className="card-body pb-0">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <div className="flex items-center gap-2 border-[1px] px-2 rounded-lg">
                                            <input required onChange={(e) => { setPassword(e.target.value) }} type={`${showPassword ? 'text' : 'password'}`} name="password" placeholder="password" className="flex-1 input input-bordered pass" />
                                            <div onClick={handleShowPassword}>
                                                {
                                                    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-control">
                                        <button className={`btn btn-primary`}>Sign In</button>
                                    </div>
                                    <div className="">
                                        <label className="label ">
                                            <Link to="/register" className="label-text-alt link link-hover">Dont Have An Account?</Link>
                                        </label>
                                    </div>
                                </form>
                                <hr />
                                <div className="w-full mt-4 mb-2 flex justify-center">
                                    <button onClick={handleGoogleLogin} className="btn w-[90%] flex items-center justify-center gap-2 font-bold">
                                        <img className="max-w-8" src={gogoleLogo} alt="" />
                                        <p>Sign In with google</p>
                                    </button>
                                </div>
                                <div className="text-center font-bold mb-2 text-red-500">
                                    {
                                        errorMsg
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btnGroup ">
                        <div className="join join-horizontal lg:join-horizontal font-bold">
                            <NavLink to="/login" className="btn join-item">Login</NavLink>
                            <NavLink to="/register" className="btn join-item">Register</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;