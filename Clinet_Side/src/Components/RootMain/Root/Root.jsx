import {  useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../../Firebase/firebase.init";
import  "./Root"
import Footer from "../../Footer/Footer";

const Root = () => {

    const [props, setProps] = useState(false)
    const [user, setUser] = useState('')
    const navigate = useNavigate()
    const auth = getAuth(app);
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
            } else {
                setUser(null)
            }
        })
        // console.log(user)
        !localStorage.getItem('mrRentalLoginToken') && navigate("/login")
    }, [navigate, auth, user])

    return (
        <div>
                <div className="mx-auto">
                    <Outlet></Outlet>
                    
                </div>
        </div>
    );
};

export default Root;