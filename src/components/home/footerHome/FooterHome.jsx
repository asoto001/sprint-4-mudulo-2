import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import {motion} from 'framer-motion'
import './style.scss'

const icons = [
    {
        to: '/restaurants',
        icon: <IoHomeOutline />
    },
    {
        to: '/search',
        icon: <BsSearch />
    },
    {
        to: '/orders',
        icon: <RxCounterClockwiseClock />
    },
    {
        to: '/profile',
        icon: <HiOutlineUser />
    }
]

const FooterHome = () => {
    const location = useLocation()
    const [locationName, setlocationName] = useState('')
    
    useEffect(() => {
        setlocationName(location.pathname)
    }, [location])

    return (
        <>
        {locationName !== '/' ? <motion.footer 
        initial={{marginLeft: '-500px'}}
        transition={{duration:  '0.9'}}
        animate={{marginLeft: '0px'}}

        className="footer">
            {icons.map((item, index) => (
                <figure key={index} className={`icons-container ${locationName == item.to ? 'active-icon' : ''} ${locationName == '/' ? '' : ''}`}>
                    <Link to={item.to} className='icons flex'>
                        {item.icon}
                        <span className={`indicator ${locationName == item.to ? 'active-indicator' : ''}`}></span>
                    </Link>
                </figure>
            ))}
        </motion.footer> : <></>}
        </>
    );
};

export default FooterHome;