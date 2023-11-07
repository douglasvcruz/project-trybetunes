import { useEffect, useState } from 'react';
import { addSong, getFavoriteSongs, removeSong, Song } from '../../services/favoriteSongsAPI';
import Loading from '../../pages/Loading';

interface MusicCardProps {
  music: Song;
  func?: () => void;
}

export default function MusicCard({ music, func }: MusicCardProps) {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const songs = async () => {
    const favoriteSongs = await getFavoriteSongs();
    favoriteSongs.forEach((element) => {
      if (element.trackId === music.trackId) {
        setChecked(true);
      }
    });
  };

  const songAdd = async () => {
    setLoading(true);
    if (checked === false) {
      await addSong(music);
      setLoading(false);
      setChecked(true);
    } else {
      await removeSong(music);
      setLoading(false);
      setChecked(false);
      if (func) {
        func();
      }
    }
  };

  useEffect(() => {
    songs();
  }, []);

  return (
    <div>
      <div className="music">
        <p>
          {music.trackName}
        </p>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          {`O seu navegador não suporta o elemento ${music.previewUrl}`}
          <code>audio</code>
        </audio>
        { loading ? <Loading /> : (
          <label htmlFor={ music.trackId }>
            <input
              className="check"
              name="music.trackId"
              id={ music.trackId }
              data-testid={ `checkbox-music-${music.trackId}` }
              type="checkbox"
              checked={ checked }
              onChange={ songAdd }
            />
            Favorita
          </label>
        )}
      </div>
    </div>
  );
}
