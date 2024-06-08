import React, { useEffect, useState } from "react";
import RentCard from "./Rent Card/RentCard";
import { FaSearch } from "react-icons/fa";
import { Triangle } from "react-loader-spinner";
import { fetchListings } from "../../../public/api";
import { IoFilter } from "react-icons/io5";
import NoData from "./NoData";
import debounce from "lodash/debounce";
import Navbar from "../Navbar/Navbar";
import { getAuth } from "firebase/auth";
import app from "../../Firebase/firebase.init";


const UserList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [availableListings, setAvailableListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [filterValue, setFilterValue] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState("All")

    const auth = getAuth(app);
    const [myListing, setMyListing] = useState(availableListings);

    useEffect(() => {
        fetchListings()
            .then(data => {
                // Filter out the inactive listings
                const activeListing = data.filter(
                    listing => listing.isActive
                )
                setAvailableListings(activeListing);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching listings:', error);
                setIsLoading(false);
            });
    }, []);


    const handleBooked = (_id) => {
        const updatedListing = { ...myListing };
        updatedListing.bookedBy = auth.currentUser;

        setMyListing(updatedListing);

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

    useEffect(() => {
        if (filterValue === 'all') {
            setFilteredListings(availableListings);
            setCategory("All")
        } else {
            const filtered = availableListings.filter(listing =>
                listing.category.toLowerCase() === filterValue.toLowerCase()
            );
            setFilteredListings(filtered);
            setCategory(filterValue)
        }
    }, [filterValue, availableListings]);

    const debouncedSearch = debounce((value) => {
        const filtered = availableListings.filter(listing =>
            listing.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredListings(filtered);
    }, 300);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        debouncedSearch(event.target.value);
    };

    return (
        <div>
            <Navbar></Navbar>
            <div>
                <div className="mx-auto flex flex-col justify-center container">
                    <div className="w-full">
                        <div className="flex flex-col md:flex-row justify-between items-center w-full">
                            <div className="dropdown dropdown-bottom dropdown-end">
                                <div tabIndex={0} role="button" className="btn m-1 bg-green-500 text-white"><IoFilter></IoFilter> {category.toUpperCase()}</div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-green-100 rounded-box left-10 w-52">
                                    <li><button onClick={() => setFilterValue('all')}>All</button></li>
                                    <li><button onClick={() => setFilterValue('car')}>Car</button></li>
                                    <li><button onClick={() => setFilterValue('bike')}>Bike</button></li>
                                    <li><button onClick={() => setFilterValue('motorcycle')}>Motorcycle</button></li>
                                </ul>
                            </div>
                            <div className="px-2 flex gap-4 outline outli rounded-full">
                                <input
                                    type="text"
                                    name="search"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    placeholder="Search..."
                                    className="py-2 bg-white px-6 ml-3"
                                />
                                <button>
                                    <FaSearch />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        {isLoading && (
                            <div className="min-h-screen min-w-screen ml-8 -mt-32 flex justify-center items-center">
                                <Triangle height="70%" width="90%" color="#00BFFF" />
                            </div>
                        )}
                    </div>
                    {
                        (filteredListings.length === 0 && !isLoading) ? <NoData /> : (
                            <div>
                                
                                <h2 className="text-2xl font-bold py-2 text-center underline">Available Listings</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 md:p-0">
                                    {filteredListings.map(listing => (
                                        !listing?.bookedBy && <RentCard handleBooked={handleBooked} listing={listing} key={listing._id} />
                                    ))}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default UserList;
