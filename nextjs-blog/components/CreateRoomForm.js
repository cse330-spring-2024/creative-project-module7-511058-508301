import { useState } from 'react';
import { supabase } from '../hooks/supabaseClient';

export default function CreateRoomForm() {
    const [roomName, setRoomName] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
    };

    const handleIsPrivateChange = (event) => {
        setIsPrivate(event.target.checked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createRoom(roomName, isPrivate);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Room name:
                <input type="text" value={roomName} onChange={handleRoomNameChange} />
            </label>
            <label>
                <input type="checkbox" checked={isPrivate} onChange={handleIsPrivateChange} />
                Private room
            </label>
            <button type="submit" onClick={createRoom}>Create room</button>
        </form>
    );
}

async function createRoom(name, isPrivate) {
    //if room is private, create an auto-generated entry code
    const password = isPrivate ? Math.random().toString(36).substring(7) : null;
    console.log(password);

    //alert user of the password
    if (isPrivate) {
        alert(`Your room password is: ${password}`);
    }
    
    // Create a new room with the given name
    const { data, error } = await supabase
        .from('rooms')
        .insert([{ room_name: name, room_password: 'otherValue' }])
        .select();
        if (error) console.error('Error inserting new room:', error);
        console.log(data);
}