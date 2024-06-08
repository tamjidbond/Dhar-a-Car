import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import app from "../../Firebase/firebase.init";
import MyListingCard from "./MyListingCard/MyListingCard";
import { Triangle } from "react-loader-spinner";
import Navbar from "../Navbar/Navbar";

const MyListings = () => {
    const auth = getAuth(app);
    const [allListings, setAllListings] = useState([]);
    const [myListings, setMyListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/listing');
                if (!response.ok) {
                    throw new Error('Failed to fetch listings');
                }
                const data = await response.json();
                setAllListings(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!allListings.length || !auth.currentUser) return;
        // console.log(auth.currentUser.email)
        const currentUserListings = allListings.filter(listing => listing.email === auth.currentUser.email);
        setMyListings(currentUserListings);
    }, [allListings, auth.currentUser]);



    const handleDelete = _id => {
        console.log(_id)
        fetch(`http://localhost:5000/listing/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                const reamain = myListings.filter(ml => ml._id !== _id);
                setMyListings(reamain)
            })
    };



    const handleUpdate = (_id) => {

        const index = myListings.findIndex(listing => listing._id === _id);
        if (index === -1) {
            console.error(`Listing with ID ${_id} not found`);
            return;
        }


        const updatedListing = { ...myListings[index] };

        // Toggle the isActive property
        updatedListing.isActive = !updatedListing.isActive;

        // Update the myListings state with the updated listing
        const updatedListings = [...myListings];
        updatedListings[index] = updatedListing;
        setMyListings(updatedListings);

        // Send the updated isActive value to the server
        fetch(`http://localhost:5000/listing/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ isActive: updatedListing.isActive })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error updating isActive property:', error);
            });
    };



    return (
        <div>
            <Navbar></Navbar>
            {isLoading && (
                <div className="min-h-screen min-w-screen ml-8 -mt-32 flex justify-center items-center">
                    <Triangle height="70%" width="90%" color="#00BFFF" />
                </div>
            )}
            <div className="container mx-auto">
                <h2 className="font-bold text-center underline text-2xl">You Have <span className="text-red-400">{myListings.length}</span> Listing</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[100vh]">
                    {error && <p>Error: {error}</p>}
                    {myListings.map(listing => <MyListingCard handleUpdate={handleUpdate} handleDelete={handleDelete} listing={listing} key={listing._id} />)}
                </div>
            </div>
        </div>
    );
};

export default MyListings;
