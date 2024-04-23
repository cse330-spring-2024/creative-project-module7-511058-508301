import React from 'react';
import {useSession} from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { set, shuffle } from 'lodash';
import useSpotify from '../hooks/useSpotify';

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
]

function Center() {
    const {data: session} = useSession();
    const [color, setColor] = useState(null);
    const spotifyApi = useSpotify();
    const [playlist, setPlaylist] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    console.log(session);

    useEffect(() => {
        setColor(shuffle(colors).pop());
    },[])

    useEffect(()=>{
        if (spotifyApi.getAccessToken()){
            const playlistId = sessionStorage.getItem('currentPlaylistId');
            if (!playlistId) return;
          spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body);
          });
        }
      
      }, [session, spotifyApi]);

    console.log(playlist);

  return (
    <div className="flex-grow">

        <header className="absolute top-5 right-8">
            <div className={`flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2`}>
                <img
                    className="rounded-full w-10 h-10"
                    src={session?.user.image} 
                    alt="User Image"/>
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className="h-5 w-5"/>
            </div>
        </header>

        <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white padding-8`}>
            <img className="h-44 w-44" src={playlist?.images?.[0].url} alt=""/>
            <div className="flex flex-col items-center"></div>
        </section>

        {/* {playlist.tracks.items.map((track) => (
              <p key={track.track.id} className="cursor-pointer hover:text-white" onClick={() => {
                sessionStorage.setItem('currentTrack', track.track.id);
                console.log(`Current track is ${track.track.name}`);
              }}>
                {playlist.name}
              </p>
          ))} */}
    </div>
  )
}

export default Center;