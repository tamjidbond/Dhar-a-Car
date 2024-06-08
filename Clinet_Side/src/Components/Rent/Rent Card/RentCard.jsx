import PropTypes from 'prop-types';
import { MdFavoriteBorder, MdAccessTime } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark, FaPhoneAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { useState } from 'react';
import { FcCheckmark } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { FaCarSide } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import { BsFuelPump } from "react-icons/bs";
import { GiCarSeat } from "react-icons/gi";
import Swal from 'sweetalert2'
import app from '../../../Firebase/firebase.init';
import { IoLocationSharp } from "react-icons/io5";


const RentCard = ({ listing, handleBooked }) => {

    const [bookmarked, setBookmarked] = useState(false);
    const [myListing, setMyListing] = useState(listing);

    const handleBookmark = () => {
        setBookmarked(!bookmarked);
    };

    const closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        modal.close();
    };

    const handleBookedd = (_id) => {
        Swal.fire({
            title: "Are you sure to book this?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, book it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Confirmed!",
                    text: "You booked this vehicle.",
                    icon: "success"
                });
                handleBooked(_id)
            }
        });
    };

    return (
        <div className="card min-h-96 bg-base-100 shadow-xl">
            <figure><img className='h-56 w-full' src={myListing.uploadedImage} alt="Listing" /></figure>
            <div className="card-body">
                <div className='flex items-center justify-between'>
                    <div>
                        {myListing.isActive ?
                            <p className='text-green-400 font-bold flex items-center'>
                                <GoDotFill />
                                Active
                            </p> :
                            <p className='text-red-400 font-bold flex items-center'>
                                <GoDotFill />
                                Inactive
                            </p>
                        }
                    </div>
                    <div className='text-xl'>
                        <button onClick={handleBookmark}>
                            {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
                        </button>
                    </div>
                </div>
                <h2 className="card-title">{myListing.title || "Title Unavailable"}</h2>
                <div className='py-0 px-0 rounded-3xl bg-green-400 w-28 text-center'>
                    <h4 className="text-base font-semibold text-white">{myListing.price || "N/A"} Tk/Hr</h4>
                </div>
                <div className='flex h-5 w-full gap-2 items-start'>
                    <img className='h-full w-5 rounded-full' src={myListing?.profilePic || 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'} alt="" />
                    Posted By: {myListing.usersName}
                </div>
                <div>
                    <div className='flex w-full justify-between'>
                        <button className="btn font-bold bg-yellow-500 text-white hover:text-[#787A91]" onClick={() => document.getElementById(`${myListing.uploadedImage}-details`).showModal()}>View Details</button>
                        <button className="btn font-bold bg-blue-500 text-white hover:text-[#787A91]" onClick={() => handleBookedd(myListing._id)}>Book Now</button>
                    </div>
                    <dialog id={`${myListing.uploadedImage}-details`} className="modal">
                        <div className="modal-box">
                            <img className='rounded-lg w-full' src={myListing.uploadedImage} alt="" />
                            <h3 className="font-bold text-lg mt-4"><span className='font-bold'>{myListing.title || "Title Unavailable"}</span></h3>
                            <p className="py-4 flex gap-1 items-center"><FaCarSide /> Model: {myListing.model || "N/A"} </p>
                            <p className="py-4 flex gap-1 items-center"><MdAttachMoney /> Price: {myListing.price || "N/A"} BDT Per Hour</p>
                            <p className="py-4 flex items-center gap-1"><BsFuelPump /> Milage: {myListing.milage || "N/A"} km/L</p>
                            <p className="py-4 flex gap-1 items-center"><GiCarSeat /> Seating Capacity: {myListing.seat || "N/A"} Person</p>
                            <p className="py-4 flex gap-1 items-center"><IoLocationSharp /> Location: {myListing.location || "N/A"} </p>
                            <p className="py-4 flex gap-1 items-center"><FaPhoneAlt /> Contact Number: {myListing.phoneNumber || "N/A"}</p>
                            <div className='flex h-5 w-full gap-2 items-start'>
                                <img className='h-full w-5 rounded-full' src={myListing?.profilePic || 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'} alt="" />
                                Posted By: {myListing.usersName}
                            </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button onClick={() => closeModal(`${myListing.uploadedImage}-details`)}>close</button>
                        </form>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

RentCard.propTypes = {
    listing: PropTypes.object.isRequired
};

export default RentCard;
