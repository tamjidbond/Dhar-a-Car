import { useEffect, useRef, useState } from "react";
import app from "../../Firebase/firebase.init";
import { Circles } from 'react-loader-spinner';
import "./add.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from "firebase/auth";
import Navbar from "../Navbar/Navbar";

const AddListing = () => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    const [usersName, setUsersName] = useState("Unknown User");
    const [category, setCategory] = useState('');
    const [profilePic, setProfilePic] = useState("https://cdn4.iconfinder.com/data/icons/user-people-2/48/6-1024.png");
    const [isLoadin, setIsLoadin] = useState(false);
    const [title, setTitle] = useState("");
    const [uploadedImage, setUploadedImage] = useState(null);
    const [model, setModel] = useState('');
    const [milage, setMilage] = useState('');
    const [seat, setSeat] = useState('');
    const [price, setPrice] = useState('');
    const [availableFrom, setAvailableFrom] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [availableTo, setAvailableTo] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [bookedBy, setBookedBy] =useState('')

    const formRef = useRef(null);

    const convertToBase64 = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800; // Max width for the resized image
                const MAX_HEIGHT = 600; // Max height for the resized image
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const dataURL = canvas.toDataURL('image/jpeg');

                setUploadedImage(dataURL);
            };
        };
        reader.onerror = (error) => {
            console.log("Error:", error);
        };
    };

    useEffect(() => {
        if (user && user.displayName) {
            setUsersName(user.displayName);
        }
        if (user && user.photoURL) {
            setProfilePic(user.photoURL);
        }
    }, [user]);

    const handleListing = async (event) => {
        event.preventDefault();
        const email = auth.currentUser.email;
        const isActive = true;
        try {
            const listing = {
                usersName,
                category,
                profilePic,
                title,
                uploadedImage,
                model,
                milage,
                seat,
                price,  
                phoneNumber,
                description,
                email,
                isActive,
                location,
                bookedBy
            };

            // Make sure your endpoint URL is correct
            const res = await fetch('http://localhost:5000/listing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(listing),
            });

            if (!res.ok) {
                // Check if the response is not ok and handle the error
                throw new Error('Failed to upload image or save listing');
            }

            // Reset form and state after successful submission
            toast.success('Listing uploaded successfully!');
            formRef.current.reset();
            setCategory('');
            setTitle("");
            setUploadedImage(null);
            setModel('');
            setMilage('');
            setSeat('');
            setPrice('');
            setPhoneNumber('');
            setDescription('');
            setLocation('');
        } catch (error) {
            // Log the error for debugging
            console.error('Error:', error);
            // Display an error message to the user
            toast.error('Failed to upload image or save listing. Please try again later.');
        }
    };



    return (
        <div>
            <Navbar></Navbar>
            <div>
                <div className="add rounded-lg">
                    <div className="w-[90%] md:w-1/2 mx-auto p-8 ">
                        <form ref={formRef} className=" text-center space-y-2  " onSubmit={handleListing}>
                            <div className="field ">
                                <label htmlFor="text" className=" ">Image</label>
                                <input
                                    className="bg-gray-200 p-2 w-full"
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={convertToBase64}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="text" className="  ">Category</label>
                                <select
                                    className="bg-gray-200 p-2 bgBord w-full"
                                    name="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    <option value="bike">Bike</option>
                                    <option value="car">Car</option>
                                    <option value="motorcycle">Motorcycle</option>
                                </select>
                            </div>

                            <div className="field">
                                <label htmlFor="text" className="  ">Title</label>
                                <input
                                    className="bg-gray-200 p-2 w-full "
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="text" className=" ">Model & Year</label>
                                <input
                                    className="bg-gray-200 p-2  w-full"
                                    type="text"
                                    name="model"
                                    placeholder="Model & Year"
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="text" className=" ">Milage (KM)</label>
                                <input
                                    className="bg-gray-200 p-2 w-full "
                                    type="number"
                                    name="milage"
                                    placeholder="Milage (KM)"
                                    value={milage}
                                    onChange={(e) => setMilage(e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="text" className=" ">Seating Capacity</label>
                                <input
                                    className="bg-gray-200 p-2  w-full"
                                    type="number"
                                    name="seat"
                                    placeholder="Seating Capacity"
                                    value={seat}
                                    onChange={(e) => setSeat(e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="text" className=" ">Price Per Hour (BDT)</label>
                                <input
                                    className="bg-gray-200 p-2  w-full"
                                    type="number"
                                    name="price"
                                    placeholder="Price per Hour (BDT)"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="text" className=" ">Description</label>
                                <input
                                    className="bg-gray-200 p-2  w-full"
                                    type="text"
                                    name="description"
                                    placeholder="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="text" className=" ">Location</label>
                                <input
                                    className="bg-gray-200 p-2  w-full"
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="text" className=" ">Phone Number</label>
                                <input
                                    className="bg-gray-200 p-2  w-full"
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>

                            <button onSubmit={handleListing} type="submit" className="btn w-full h-20 btn-success">
                                <div className="h-10 text-white w-10 flex items-center justify-center font-bold text-3xl">
                                    {
                                        isLoadin ? <Circles
                                            color="#fff"
                                            height="60"
                                            width="60">
                                        </Circles> : "Submit"
                                    }
                                </div>
                            </button>
                        </form>
                    </div>
                    <ToastContainer /> {/* Toast container for displaying notifications */}
                </div>
            </div>
        </div>
    );
};

export default AddListing;
