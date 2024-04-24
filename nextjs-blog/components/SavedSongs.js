// import { useEffect, useState } from "react";

// export default function SavedSongs() {
//     const [savedSongs, setSavedSongs] = useState([]);
//     useEffect(() => {
//         setSavedSongs(JSON.parse(sessionStorage.getItem("savedSongs")));
        
//     });
    
//   return (
//     savedSongs != [] ? (
//         <div>
//             <h2>Saved Songs</h2>
//             <ul>
//                 {savedSongs?.map((song) => (
//                     <li>{song}</li>
//                 ))}
//             </ul>
//         </div>
//     ) : (
//         <p>No saved songs</p>
//     )
//   )
// }