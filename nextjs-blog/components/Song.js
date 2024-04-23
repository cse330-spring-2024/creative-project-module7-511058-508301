// import { useRecoilState } from 'recoil';
// import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import { useSpotify } from '../hooks/useSpotify';

function Song(order, track) {
    const spotifyApi = useSpotify();
    // const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    // const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    const playTrack = () => {
        sessionStorage.setItem('currentTrackId', track.track.id);
        sessionStorage.setItem('isPlaying', true);
        spotifyApi.play({uris: [track.track.uri]});
    }
  return (
    <div className="grid grid-cols-2 text-grey-500 py-4 px-5 hover: bg-grey-900 rounded-lg cursor-pointer"
        onClick={playTrack}>
        <div>
            <p>{order+1}</p>
            <img className="h-10 w-10"
            src={track.track.album.images[0].url}
            alt=""
            />
            <div>
                <p>{track.track.name}</p>
                <p>{track.track.artists[0].name}</p>
            </div>
        </div>
 
        <div>
            <p>{track.track.album.name}</p>
            <p>duration</p>
        </div>
    </div>

  )
}

export default Song