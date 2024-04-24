'use client';

import { useEffect, useState } from "react";
import { supabase } from "../hooks/supabaseClient";

type Room = {
    room_id: number;
    room_name: string;
    room_password: string;
};


export default function RealTimeRooms({serverRooms} : {serverRooms: Room[]}) {
    //console.log('RealTimeRooms', serverRooms);
    
    const [rooms, setrooms] = useState(serverRooms);

    useEffect(() => {
        setrooms(serverRooms);
    }, [serverRooms]);
    
    //console.log('RealTimeRooms before', rooms);
    useEffect(() => {  
        const channel = supabase.channel('realtime:rooms').on('postgres_changes', {
            event: 'INSERT', schema: 'public', table: 'rooms'
        }, (payload) => {
            //console.log('Change received!', payload);
            //add the new user to the list of rooms
            setrooms(prevRooms => [...prevRooms, payload.new as Room]);
        }).subscribe();

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase, setrooms]);
    //console.log('RealTimeRooms after', rooms);
    return (
        <div>
            {rooms.map((room) => (
                <div key={room.room_id}>
                    <button key={room.room_id} onClick={() => {
                        handleRoomClick(room);
                    }}>
                        {room.room_name} - {room.room_id}
                    </button>
                    <br />
                </div>
            ))}
        </div>
    );
}

function handleRoomClick(room: Room) {
    console.log('Room clicked');
    window.dispatchEvent(new Event("joinRoom"));
    sessionStorage.setItem('room_id', room.room_id.toString());
}