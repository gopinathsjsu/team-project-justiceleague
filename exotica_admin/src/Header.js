import React from 'react'
import "./Header.css"
import { HiUser , HiOutlineShoppingBag} from 'react-icons/hi';
import { BsBookmarksFill} from 'react-icons/bs';
import {AiOutlineLogout, AiTwotoneAccountBook} from "react-icons/ai"
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core';
import  ExpandMore  from '@material-ui/icons/ExpandMore';
import  LanguageIcon  from '@material-ui/icons/Language';
import {Link} from "react-router-dom"

import {useHistory} from "react-router-dom"
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer'


function Header() {
    const [{admin}, dispatch] = useStateValue();

    var history = useHistory();

 
var logout = ()=>{
    dispatch({
        type:actionTypes.LOGOUT,
    })
}
    

    return (
        <div className="header ">
            <Link to="/">
            <p className="Exotica"> Exotica</p>
            </Link>
            

            <div className="header_right">
              <div className="item " onClick={()=>{history.push("/hotel_details")}}>
                  <HiUser style={{fontSize:"16px",color:"grey",marginBottom:"5px"}}/>
                  <span className="icon_desc" >Hotel Profile</span>
              </div>

              <div className="item" onClick={()=>{history.push("/addDetails")}}>
                  <HiOutlineShoppingBag style={{fontSize:"16px",color:"grey",marginBottom:"5px"}} />
                
                  <span className="icon_desc">Add Detials</span>
              </div>


              <div className="item" onClick={()=>{history.push("/bookings")}}>
                  <AiTwotoneAccountBook style={{fontSize:"16px",color:"grey",marginBottom:"5px"}} />
                
                  <span className="icon_desc">Bookings</span>
              </div>

              <div className="item" onClick={logout}>
                  <AiOutlineLogout style={{fontSize:"16px",color:"grey",marginBottom:"5px"}} />
                
                  <span className="icon_desc">Logout</span>
              </div>
            </div>
        </div>
    )
}

export default Header
