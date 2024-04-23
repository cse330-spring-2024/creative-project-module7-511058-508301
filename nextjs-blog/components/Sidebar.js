import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify';
import { useEffect, useState } from 'react';
// import { playlistState } from '../atoms/playlistAtom';


function Sidebar() {
  const spotifyApi = useSpotify();
  const {data: session, status} = useSession();
  const [playlists, setPlaylists] = useState([]);


  useEffect(()=>{
    if (spotifyApi.getAccessToken()){
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  
  }, [session, spotifyApi]);

  console.log(playlists);



  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen">
        <h1>
            Music Room
        </h1>
        <div className="space-y-4">
          <button className="flex items-center space-x-2 hover:text-white" onClick={() => signOut()}>
            <p> Log out</p>
          </button>


          {playlists.map((playlist) => (
              <p key={playlist.id} className="cursor-pointer hover:text-white" onClick={() => {
                sessionStorage.setItem('currentPlaylistId', playlist.id);
                console.log(`Current playlist is ${playlist.name}`);
              }}>
                {playlist.name}
              </p>
          ))}
        </div>
    </div>
  )
}
 
export default Sidebar