import Sidebar from '/components/Sidebar';
import Center from '/components/Center';
import SearchBar from '/components/SearchBar';
import CreateRoomForm from '/components/CreateRoomForm';
import SavedSongs from '/components/SavedSongs';
// import Search from '/components/Search';
// import { useEffect, useState } from 'react';
// import { supabase } from '../hooks/supabaseClient';

export default function Room() {
  return(
  <div className="bg-black">
        <CreateRoomForm />
    <main className="flex">
      <Sidebar />
      <Center />

      {/* <SavedSongs /> */}
    </main>
    <div><SearchBar /></div>
    <div>{/*Player*/}</div>
  </div>    
  );
}