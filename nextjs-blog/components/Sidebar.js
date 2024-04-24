import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';
import { supabase } from '../hooks/supabaseClient';
//import RealTimeUsers from './realtime';
import RealTimeRooms from './RealTime';

function Sidebar() {
  // const [currentPlaylistId, setCurrentPlaylistId] = useRecoilState(playlistIdState);
  const spotifyApi = useSpotify();
  const {data: session, status} = useSession();
  const [playlists, setPlaylists] = useState([]);

  //gathers rooms from supabase
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const fetchRooms = async () => {
      const { data: rooms, error } = await supabase.from('rooms').select();
      console.log('Data:', rooms, 'Error:', error);
      if (error) {
        console.error(error);
      } else {
        setRooms(rooms);
      }
    };

    fetchRooms();
  }, []);



  useEffect(()=>{
    if (spotifyApi.getAccessToken()){
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  
  }, [session, spotifyApi]);

  // console.log(playlists);



  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen">
        <h1>
            Music Room
        </h1>
        <div className="space-y-4">
          {/* Updates rooms in real time */}
          <RealTimeRooms serverRooms={rooms} />
        </div>

        {playlists?.map((playlist) => (
              <p key={playlist.id} className="cursor-pointer hover:text-white" onClick={() => {
                sessionStorage.setItem('currentPlaylistId', playlist.id);
                window.dispatchEvent(new Event("storage"));
                console.log(`Current playlist is ${playlist.name}`);
              }}>
                {playlist.name}
              </p>
          ))}
    </div>
  )
}
 
export default Sidebar