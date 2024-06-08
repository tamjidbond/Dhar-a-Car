import { GoDotFill } from "react-icons/go";
import PropTypes from 'prop-types';

const MyBookedCard = ({ listing, handleRemoveBooked }) => {

    return (
        <div>
            <div className="card h-96 bg-base-100 shadow-xl">
                <figure className="px-10  pt-10">
                    <img src={listing.uploadedImage} alt="Shoes" className="rounded-xl w-full h-48" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{listing.title}</h2>
                    <p>{listing.price} tk/hr</p>
                    <div className='flex h-5 w-full gap-2 justify-center'>
                        <img className='h-full w-5 rounded-full' src={listing?.profilePic || 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'} alt="" />
                        Posted By: {listing.usersName}
                    </div>
                    <div className="card-actions">
                        <button className={`btn text-white ${listing.isActive ? 'btn-error' : 'btn-success'}`} onClick={() => handleRemoveBooked(listing._id)}>Cancel Booking</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

MyBookedCard.propTypes = {
    listing: PropTypes.object,
    handleDelete: PropTypes.func,
    handleRemoveBooked: PropTypes.func
}
export default MyBookedCard;