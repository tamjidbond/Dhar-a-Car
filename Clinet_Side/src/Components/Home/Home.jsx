import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
const Home = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://wallpaperaccess.com/full/1513452.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"><Navbar></Navbar></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-4xl font-bold">Discover the Road Ahead with <span className="text-blue-500">`Dhar-a Car`</span></h1>
                        <p className="mb-5">Unlock the Road to Your Next Adventure: Explore, Rent, and Ride with Us!</p>
                        <div className="space-x-2">
                            <Link to='/addListing'><button className="btn btn-primary">Owner</button></Link>
                            <Link to='/rent'><button className="btn btn-primary">Renter</button></Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;