import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default function MusicCard({ music, func }) {
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
          &nbsp;&nbsp;
          {music.trackName}
          &nbsp;&nbsp;
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

MusicCard.defaultProps = {
  func: null,
};

MusicCard.propTypes = {
  func: PropTypes.func,
  music: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
  }).isRequired,
};
