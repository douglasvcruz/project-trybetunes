import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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
    const { checked } = this.state;
    this.setState({
      loading: true,
    });

    if (checked === false) {
      await addSong(musica);
      this.setState({
        checked: true,
        loading: false,
      });
    } else {
      await removeSong(musica);
      this.setState({
        checked: false,
        loading: false,
      }, () => {
        const { func } = this.props;
        if (func) {
          func();
        }
      });
    }
  };

  render() {
    const { musica } = this.props;
    const { checked, loading } = this.state;
    const { trackId, trackName, previewUrl } = musica;
    return (
      <div>
        <div className="music">
          <p>
          &nbsp;&nbsp;
            {trackName}
          &nbsp;&nbsp;
          </p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            {`O seu navegador não suporta o elemento ${previewUrl}`}
            <code>audio</code>
          </audio>
          { loading ? <Loading /> : (
            <label htmlFor={ trackId }>
              <input
                className="check"
                name="trackId"
                id={ trackId }
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                checked={ checked }
                onChange={ this.songAdd }
              />
              Favorita
            </label>
          )}
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  func: PropTypes.func.isRequired,
  musica: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
  }).isRequired,
};
