import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    checked: false,
  };

  componentDidMount() {
    this.songs();
  }

  songs = async () => {
    const som = await getFavoriteSongs();
    const { musica } = this.props;

    som.forEach((element) => {
      if (element.trackId === musica.trackId) {
        this.setState({
          checked: true,
        });
      }
    });
  };

  songAdd = async () => {
    const { musica } = this.props;
    this.setState({
      loading: true,
      checked: false,
    });
    await addSong(musica);

    this.setState({
      checked: true,
      loading: false,
    });
  };

  render() {
    const { musica } = this.props;
    const { checked, loading } = this.state;
    const { trackId, trackName, previewUrl } = musica;
    return (
      <div>
        <div>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            {`O seu navegador não suporta o elemento ${previewUrl}`}
            <code>audio</code>
          </audio>
          { loading ? <Loading /> : (
            <label htmlFor="checkbox">
              <input
                name="trackId"
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                checked={ checked }
                onChange={ this.songAdd }
              />
            </label>
          )}
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musica: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};
