import { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { musica } = this.props;
    return (
      <div>
        { musica.map((a) => (
          <div key={ a.trackId }>
            <p>{a.trackName}</p>
            <audio data-testid="audio-component" src={ a.previewUrl } controls>
              <track kind="captions" />
              {`O seu navegador não suporta o elemento ${a.previewUrl}`}
              <code>audio</code>
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musica: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
