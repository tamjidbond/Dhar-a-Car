import { GoDotFill } from "react-icons/go";
import PropTypes from 'prop-types';

const MyListingCard = ({ listing, handleDelete, handleUpdate }) => {

    return (
        <div>
            <div className="card h-[570px] bg-base-100 shadow-xl">
                <figure className="px-10  pt-10">
                    <img src={listing.uploadedImage} alt="Shoes" className="rounded-xl w-full h-48" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{listing.title}</h2>
                    {
                        listing.bookedBy.displayName ?
                            <div className="bg-green-200 h-28 flex flex-col p-4 rounded-lg ">
                                <p className="underline">Currently Booked By</p>
                                <p>{listing?.bookedBy?.displayName || "Unknown User"}</p>
                                <p>{listing?.bookedBy?.email || "No Email"}</p>
                            </div> :
                            <div className="bg-red-200 h-28 flex flex-col p-4 rounded-lg ">
                                <p className="flex justify-center items-center">Not Booked Yet</p>
                            </div>
                    }
                    <p>{listing.price} tk/hr</p>
                    {
                        (!listing.bookedBy) ?
                            <p className="text-green-500 font-bold flex items-center">
                                <GoDotFill></GoDotFill>
                                Listing is Avaiable
                            </p> :
                            <p className="text-red-500 font-bold flex items-center">
                                <GoDotFill></GoDotFill>
                                Listing is Booked
                            </p>
                    }
                    <div className="card-actions">
                        {
                            !listing.bookedBy.displayName ?
                                <>
                                    <button className={`btn text-white ${listing.isActive ? 'btn-error' : 'btn-success'}`} onClick={() => handleUpdate(listing._id)}>{listing.isActive ? 'Hide Listing' : 'Show Listing'}</button>
                                    <button className={`btn bg-red-800 text-white`} onClick={() => handleDelete(listing._id)}>Delete</button>
                                </> :
                                <>
                                    <button disabled className={`btn text-white ${listing.isActive ? 'btn-error' : 'btn-success'}`} onClick={() => handleUpdate(listing._id)}>{listing.isActive ? 'Deactive' : 'Active'}</button>
                                    <button disabled className={`btn bg-red-800 text-white`} onClick={() => handleDelete(listing._id)}>Delete</button>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

MyListingCard.propTypes = {
    listing: PropTypes.object,
    handleDelete: PropTypes.func,
    handleUpdate: PropTypes.func
}
export default MyListingCard;