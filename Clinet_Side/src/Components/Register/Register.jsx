import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import gogoleLogo from "./../../assets/logo/google.png"
import { useState, useEffect } from "react";
import login from "./../../assets/animation/login.json"
import { NavLink } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";
import "./Register.css"
import { createUserWithEmailAndPassword, getAuth, signInWithPopup, updateProfile, GoogleAuthProvider } from "firebase/auth";
import app from "../../Firebase/firebase.init";

const provider = new GoogleAuthProvider();
const Register = () => {
    const navigate = useNavigate()
    const auth = getAuth(app);
    const [errorMsg, setErrorMsg] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowpassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleRegister = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                console.log(result)
                navigate("/")
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleShowPassword = () => {
        setShowpassword(!showPassword)
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    useEffect(() => {
        localStorage.getItem('mrRentalLoginToken') && navigate("/")
    }, [navigate])

    const handleSubmit = async (e) => {
        setErrorMsg('');
        e.preventDefault();

        // Construct the full name from first name and last name
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const fullName = `${firstName} ${lastName}`;

        const email = e.target.email.value;
        const phoneNumber = e.target.phoneNumber.value;
        const password = e.target.password.value;

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                // Update display name
                await updateProfile(user, {
                    displayName: fullName
                });
                document.getElementById('my_modal_5').showModal();
            })
            .catch(error => {
                setErrorMsg(error.code);
            });
    }

    return (
        <div className="reg">
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box text-center mx-auto flex flex-col items-center justify-center">
                    <FcCheckmark className="text-7xl"></FcCheckmark>
                    <p className="py-4 text-2xl font-bold">Registered Successfully, Please login!!</p>
                    <div className="modal-action">
                        <Link to="/login" className="btn hover:bg-[#787A91] hover:text-black bg-green-400 font-bold text-white">Go to Login</Link>
                    </div>
                </div>
            </dialog>
            <div className="" >
                <div className="hero min-h-screen bg flex flex-col items-center justify-center" >
                    <h3 className="text-4xl font-bold">Register</h3>
                    <div>
                        <div className="hero-content flex-col lg:flex-row-reverse">
                            <div className="max-w-44 md:max-w-full text-center lg:text-left lg:flex flex-col items-center hidden md:hidden ">
                                <Lottie animationData={login}></Lottie>
                            </div>
                            <div className=" card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                <form onSubmit={handleSubmit} className="card-body pb-0">

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">First Name</span>
                                        </label>
                                        <input required type="text" placeholder="Enter your first name" name="firstName" className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Last Name</span>
                                        </label>
                                        <input required type="text" placeholder="Enter your last name" name="lastName" className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input required type="email" placeholder="Enter email" name="email" className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Phone Number</span>
                                        </label>
                                        <input required type="text" placeholder="Phone Number" name="phoneNumber" className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password (At least 6 characters)</span>
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
                                        <label className="label">
                                            <span className="label-text">Confirm Password</span>
                                        </label>
                                        <div className="flex items-center gap-2 border-[1px] px-2 rounded-lg">
                                            <input required onChange={e => setConfirmPassword(e.target.value)} type={`${showConfirmPassword ? 'text' : 'password'}`} name="confirmPassword" placeholder="Confirm Password" className="flex-1 input input-bordered pass" />
                                            <div onClick={handleShowConfirmPassword}>
                                                {
                                                    showConfirmPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-control">
                                        <button className={`btn btn-primary`} disabled={(password === confirmPassword && password.length >= 6) ? "" : "disabled"}>Sign Up</button>
                                    </div>
                                    <div className="">
                                        <label className="label ">
                                            <Link to="/login" className="label-text-alt link link-hover">Already Have An Account?</Link>
                                        </label>
                                    </div>
                                </form>
                                <hr />
                                <div className="w-full mt-4 mb-2 flex justify-center">
                                    <button className="btn w-[90%] flex items-center justify-center gap-2 font-bold" onClick={handleRegister}>
                                        <img className="max-w-8" src={gogoleLogo} alt="" />
                                        <p>Sign Up with google</p>
                                    </button>
                                </div>
                                <div className="text-center mb-2 text-[#787A91]">
                                    {errorMsg}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btnGroup">
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

export default Register;
