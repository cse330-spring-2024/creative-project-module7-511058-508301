import Sidebar from '/components/Sidebar';
import Center from '/components/Center';
import SearchBar from '/components/SearchBar';
// import Search from '/components/Search';
// import { useEffect, useState } from 'react';
// import { supabase } from '../hooks/supabaseClient';

export default function Room() {
  return(
  <div className="bg-black">
    <main className="flex">
      <Sidebar />
      <Center />
    </main>
    <div><SearchBar /></div>
    <div>{/*Player*/}</div>
  </div>    
  );
}