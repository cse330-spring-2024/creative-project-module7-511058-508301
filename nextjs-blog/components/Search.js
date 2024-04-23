// import React from 'react'
// import { Button, Container, InputGroup, FormControl } from 'react-bootstrap';
// import { useState } from 'react';
// import useSpotify from '../hooks/useSpotify';

// function Search() {
//     const [search, setSearch] = useState('');
//     const spotifyApi = useSpotify();
//   return (
//     <div>
//         <Container>
//             <InputGroup>
//                 <FormControl
//                     placeholder="Search for a song"
//                     type="input"
//                     onChange={event => setSearch(event.target.value)}
//                 >
//                 </FormControl>
//                 <Button onClick={() => {
//                     spotifyApi.searchTracks(`track:${search}`).then((data) => {
//                         console.log(data.body.tracks.items);
//                     });
//                 }}></Button>
//             </InputGroup>
//         </Container>
//     </div>
//   )
// }

// export default Search