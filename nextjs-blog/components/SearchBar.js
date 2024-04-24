import React from 'react';

import {useSession} from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';

function SearchBar() {
  const {data: session} = useSession();
  const [searchValue, setSearchValue] = useState('');
  const spotifyApi = useSpotify();

  return (
    <div className="fixed bottom-0 w-full">
      <input 
        type="text" 
        placeholder="Search..." 
        className="w-full p-2"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button className="bg-green-500 text-white w-full p-2" onClick={()=>{
        spotifyApi.searchTracks(searchValue).then((data) => {
          console.log(data.body.tracks.items);
          sessionStorage.setItem('currentTrack', data.body.tracks.items[0].id);
          spotifyApi.play({uris: [data.body.tracks.items[0].uri]}).catch((err) => {
                    console.error(`We have a situation: ${err}`);
                });
        });
      }}>Search</button>
    </div>
  );
}

export default SearchBar;