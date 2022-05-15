import React from "react";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import { withRoomConsumer } from "../context";
import Loading from "./Loading";
import { useState, useEffect } from "react";
import { getAllRooms } from "../controllers/rooms";

function RoomsContainer({ context }) {
  const [rooms, setRooms] = useState(null);
  // const{loading,sortedRooms,rooms} = context;

  useEffect(() => {
    getAllRooms()
      .then((res) => setRooms(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  if (!rooms) {
    return <Loading />;
  }

  return (
    <>
      {/* <RoomsFilter rooms={rooms} /> */}
      <RoomsList rooms={rooms} />
    </>
  );
}
export default withRoomConsumer(RoomsContainer);
