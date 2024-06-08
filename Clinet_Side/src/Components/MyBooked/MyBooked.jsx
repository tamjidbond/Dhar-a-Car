import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import Navbar from '../Navbar/Navbar';
import app from '../../Firebase/firebase.init';
import MyBookedCard from './MyBookedCard/MyBookedCard';
import { Triangle } from "react-loader-spinner";
import NoData from "./../Rent/NoData";

const MyBooked = () => {
    const auth = getAuth(app);
    const [allListings, setAllListings] = useState([]);
    const [myBooked, setMyBooked] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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
        const currentUserListings = allListings.filter(listing => listing.bookedBy?.email === auth.currentUser.email);
        setMyBooked(currentUserListings);
    }, [allListings, auth.currentUser]);

    const handleRemoveBooked = (_id) => {
        const updatedListing = { ...myBooked };
        updatedListing.bookedBy = '';

        setMyBooked(updatedListing);

        fetch(`http://localhost:5000/listing/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedListing)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error updating isActive property:', error);
            });
    }

    return (
        <div>
            <Navbar />
            <h2 className="font-bold text-center underline text-2xl">You Have <span className="text-red-400">{myBooked.length || "0"}</span> Booked Vehicle</h2>
            {
                isLoading &&
                <div className="min-h-screen min-w-screen ml-8 -mt-32 flex justify-center items-center">
                    <Triangle height="70%" width="90%" color="#00BFFF" />
                </div>
            }
            {
                myBooked.length==0 && <NoData></NoData>
            }
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[100vh]'>
                {Array.isArray(myBooked) && myBooked.map(listing => <MyBookedCard handleRemoveBooked={handleRemoveBooked} key={listing._id} listing={listing}></MyBookedCard>)}
            </div>

        </div>
    );
};

export default MyBooked;
