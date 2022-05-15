import React ,{useState,useEffect} from 'react';

import './Profile.css'
import './Bookings.css'
import {FaHotel} from "react-icons/fa"

import { fetch_rooms } from "./controllers/rooms";
import { Dialog, DialogContent, DialogTitle, TextField, DialogActions, Button } from '@material-ui/core';

function Rooms() {
   
    var [ room_details, setRooms ]= useState([]);

    useEffect(()=>{
        async function get_rooms(){
            const {status, data} = await fetch_rooms();
            console.info("Rooms.js::useEffect::Rooms = ", data);
            if (status === 200) {
                setRooms(data.data);
            };
        } 
        get_rooms();
    }, []);
    
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (    
        <div className="container">
            <h4 style={{"textAlign":"left","color":""}}><FaHotel /> Room Details </h4>
            <div className="table">
                <div className="table-header">
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Room</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Name</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Type</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Base</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Festival Surge</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Weekend Surge</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Guest Fee</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">X</a></div>
                </div>

                <div className="table-content">
                    {
                        room_details && room_details.map(room=> {
                            const {
                                id, name, room_type, base_price, festival_surge, week_end_surge, guest_fee, guest_count
                            } = room;

                            return (
                                <div key = {id} className="table-row">
                                    <div className="table-data">{id}</div>
                                    <div className="table-data">{name}</div>
                                    <div className="table-data">{room_type}</div>
                                    <div className="table-data">{base_price}</div>
                                    <div className="table-data">{festival_surge}</div>
                                    <div className="table-data">{week_end_surge}</div>
                                    <div className="table-data">{guest_fee}</div>
                                    <div className="table-data">
                                        <button onClick={handleClickOpen}>
                                            <Dialog open={open} onClose={handleClose}>
                                                <DialogTitle> Edit Room </DialogTitle>
                                                <DialogContent>

                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="Name"
                                                        fullWidth
                                                        variant="standard"
                                                        value = {name}
                                                    />

                                                    <TextField
                                                        margin="dense"
                                                        id="name"
                                                        label="Base Price"
                                                        type="email"
                                                        fullWidth
                                                        variant="standard"
                                                        value = {base_price}
                                                    />

                                                    <TextField
                                                        margin="dense"
                                                        id="name"
                                                        label="Festival Surge"
                                                        type="email"
                                                        fullWidth
                                                        variant="standard"
                                                        value = {festival_surge}
                                                    />

                                                    <TextField
                                                        margin="dense"
                                                        id="name"
                                                        label="Weekend Surge"
                                                        type="email"
                                                        fullWidth
                                                        variant="standard"
                                                        value = {week_end_surge}
                                                    />

                                                    <TextField
                                                        margin="dense"
                                                        id="name"
                                                        label="Guests Count"
                                                        type="email"
                                                        fullWidth
                                                        variant="standard"
                                                        value = {guest_count}
                                                    />
                                                    <TextField
                                                        margin="dense"
                                                        id="name"
                                                        label="Guests Surge"
                                                        type="email"
                                                        fullWidth
                                                        variant="standard"
                                                        value = {guest_fee}
                                                    />
                                                </DialogContent>

                                                <DialogActions>
                                                    <Button onClick={handleClose}>Cancel</Button>
                                                    <Button onClick={handleClose}>Submit</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }  
                </div>  
            </div>
        </div>
    )
}

export default Rooms