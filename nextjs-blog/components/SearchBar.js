import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import { set } from 'lodash';
import { supabase } from '../hooks/supabaseClient';

function SearchBar() {
  const { data: session } = useSession();
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState(null);
  const spotifyApi = useSpotify();

  useEffect(() => {
    //get songs from database
    if (!data) return;
    console.log(data);
    const insertData = async () => {
      const room_id = sessionStorage.getItem('room_id');
      if (!room_id) return;
          let { data: room_and_song_pairs, error } = await supabase
            .from('room_and_song_pairs')
            .select('*')
            .eq('room_id', room_id);
          if (error) {
              console.error('Error fetching all songs data: ', error);
          } else {
              if (room_and_song_pairs.length === 0) {
                  console.log('No songs in this room yet');
                  spotifyApi.play({uris: [`${data.uri}`]}).catch((err) => {
                    console.error(`We have a situation: ${err}`);
                });
              }else{
                  console.log('Songs in this room already');
              } 
          }

      //check if song is already in database
      let { data: room_and_song_pairs2, error2 } = await supabase
        .from('room_and_song_pairs')
        .select('*')
        .eq('room_id', room_id)
        .eq('song_id', data.id);
      if (error2) {
        console.error('Error fetching all songs data: ', error2);
      }
      if(room_and_song_pairs2 == null){
        
      }
      else if (room_and_song_pairs2.length > 0) {
        console.log('Song already in room');
        return;
      }

      //insert song into database
      const { qdata, error3 } = await supabase
      .from('room_and_song_pairs')
      .insert([
        { room_id: sessionStorage.getItem('room_id'), song_object: data, song_id: data.id},
      ])
      .select()
      if(error2) console.log(error3);    
    };

    insertData();
  }, [data]);

  const handleSearch = async (searchValue) => {
    const result = await spotifyApi.searchTracks(searchValue);
    console.log(result.body.tracks.items[0]);
    setData(result.body.tracks.items[0]);
  };

  return (
    <div className="fixed bottom-0 w-full">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button className="bg-green-500 text-white w-full p-2" onClick={() => {handleSearch(searchValue)}}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;

