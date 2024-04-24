import React from 'react';
import {useSession} from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { set, shuffle } from 'lodash';
import useSpotify from '../hooks/useSpotify';
import { supabase } from '../hooks/supabaseClient';
import SavedSongs from './SavedSongs';
import { Alert } from "react-bootstrap";

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
    const [SongsInfo, setSongsInfo] = useState([]);
    
    const [currentPairId, setCurrentPairId] = useState(null);
    //const [savedSongsYesNo, setSavedSongsYesNo] = useState(false);

    // console.log(session);

    useEffect(() => {  
      const channel = supabase.channel('realtime:Songs').on('postgres_changes', {
          event: 'INSERT', schema: 'public', table: 'room_and_song_pairs'
      }, (payload) => {
          console.log('Change received!', payload);
          //add the new song to the list of songs
          setSongsInfo(prevSongs => [...prevSongs, payload.new]);
      }).subscribe();
    
      return () => {
          supabase.removeChannel(channel)
      }
    }, [supabase, SongsInfo, setSongsInfo]);

    useEffect(() => {
        setColor(shuffle(colors).pop());
    },[]);

    useEffect(() => {
        window.addEventListener('saved_songs', () =>{
            console.log('saved songs event. should show saved songs page.')
            //setSavedSongsYesNo(true);
            //write an alert to show saved songs in the session storage
            const savedSongs = JSON.parse(sessionStorage.getItem('savedSongs'));
            console.log(savedSongs);
            if (savedSongs) {
              alert(savedSongs);
              //setSavedSongsYesNo(false);
              return;
            }
            
        })
    })

    useEffect(()=>{
        const playlistId = sessionStorage.getItem('currentPlaylistId');
        if (!playlistId) return;
        if (spotifyApi.getAccessToken()){
            
          spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body);
          });
        }
      
      }, [session, spotifyApi]);

    useEffect(() => {
        window.addEventListener('storage', () => {
            const playlistId = sessionStorage.getItem('currentPlaylistId');
            if (!playlistId) return;
            if (spotifyApi.getAccessToken()){
                
                spotifyApi.getPlaylist(playlistId).then((data) => {
                setPlaylist(data.body);
              });
            }
        });
    }, [session, spotifyApi]);

    // console.log(playlist);

    //add event listenter for joinRoom
    useEffect(() => {

      window.addEventListener('joinRoom', async (e) => {
        //setSavedSongsYesNo(false);
        //fetch all songs data
          const room_id = sessionStorage.getItem('room_id');
          let { data: room_and_song_pairs, error } = await supabase
            .from('room_and_song_pairs')
            .select('*')
            .eq('room_id', room_id);
          if (error) {
              console.error('Error fetching all songs data: ', error);
          } else {
              console.log('Fetched data: ', room_and_song_pairs);
                setSongsInfo(room_and_song_pairs);
                
          }
        });
    }, []);
    // useEffect(() => {
    //   window.addEventListener('saved_songs', () => {
    //     //remove all elements from center and display saved songs
    //     const savedSongs = JSON.parse(sessionStorage.getItem('savedSongs'));
    //     console.log(savedSongs);
    //     //remove all elements from center
    //     const center = document.querySelector('.center');
    //     center.innerHTML = '';
    //     //display saved songs
    //     savedSongs.forEach((song) => {
    //       center.innerHTML += `<p>${song}</p>`;
    //     });
    //   })
    // });
    // if (savedSongsYesNo) {
    //     return (
    //         <SavedSongs />
    //     )
    // }else{
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
        
                    <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 w-full text-white padding-8`}>
                            <img className="h-44 w-44" src={playlist?.images?.[0].url} alt=""/>
                            <div className="flex flex-col items-center"></div>
                    </section>
        
                    {SongsInfo?.map((entry) => (
                            <div key={entry.song_object.id} className="text-gray-500 hover:text-white">
                            
                                <p  className="cursor-pointer" onClick={() =>{
                                    spotifyApi.play({uris: [`${entry.song_object.uri}`]}).catch((err) => {
                                        console.error(`We have a situation: ${err}`);
                                    });
                                }}>
                                    {entry.song_object.name}
                                </p>
                                <button onClick={() => {saveSong(entry.song_object.name)}}>Save</button>
                            </div>
                        ))}
            </div>
        );
    }

//}

export default Center;

function saveSong(song_name) {
  //check if session variable "savedSongs" does exists
  let savedSongs = JSON.parse(sessionStorage.getItem('savedSongs'));
  if (!savedSongs) savedSongs = [];
  //add song to savedSongs
  savedSongs.push(song_name);
  //save savedSongs to session storage
  sessionStorage.setItem('savedSongs', JSON.stringify(savedSongs));
  console.log(`Save song ${song_name}`);
}

                            // sessionStorage.setItem('currentTrack', track.track.id);
                            // console.log(`Save track ${track.track.name}`);
                            // spotifyApi.play({uris: [`${track.track.uri}`]}).catch((err) => {
                            //     console.error(`We have a situation: ${err}`);
                            // });

