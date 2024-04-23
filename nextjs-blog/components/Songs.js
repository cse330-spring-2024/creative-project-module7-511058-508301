import React from 'react'


function Songs() {
    const playlist = useRecoilValue(playlistState);
  return (
    <div>
    {playlist.tracks.items.map((track) => (
        <div>{track.track.name}</div>
    ))}
        <p></p>
    </div>
  )
}

export default Songs