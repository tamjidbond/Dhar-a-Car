import React from 'react';
import { FaCar } from "react-icons/fa";


const Footer = () => {
    return (
        <div className=' bg-neutral'>
            <div>
                <footer className="footer footer-center py-2 bg-grey text-primary-content">
                    <aside>
                        <p className='flex items-center gap-2'><FaCar></FaCar> Copyright by Dhar-a Car © 2024 </p>
                    </aside>
                </footer>
            </div>
        </div>
    );
};

export default Footer;