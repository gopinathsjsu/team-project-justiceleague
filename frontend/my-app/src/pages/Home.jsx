import React from 'react'
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import Promo from '../components/Promo';
import FeaturedRooms from '../components/FeaturedRooms';
import DatePicker from "react-datepicker";
import { RoomContext } from '../context';

import moment from 'moment';

export default function Home() {
    return (
        <>
        
        <Hero hero="defaultHero">
            
        </Hero>
        
        <Banner title="The best hotels around the world" subtitle="We have a wide range of hotel rooms you can select from">   
        <Link to="/rooms" className="btn btn-primary">
     Search 
     </Link>
       
        </Banner>
        <FeaturedRooms/>
        <Promo/>
        <Services/> 
        
        </>

    )
}
