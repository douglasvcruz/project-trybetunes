import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    musica: [],
    test: [],
  };

  componentDidMount() {
    this.getMusic();
  }

  getMusic = async () => {
    const { match: {
      params: { id },
    } } = this.props;

    const music = await getMusics(id);

    this.setState({
      musica: music,
      test: music[0],
    });
  };

  render() {
    const { musica, test } = this.state;
    const slice = musica.slice(1);
    return (
      <div data-testid="page-album">
        <Header />
        <div className="div-album">
          <p
            className="artist-name"
            data-testid="artist-name"
          >
            {test.artistName}
          </p>
          <p
            className="album-name"
            data-testid="album-name"
          >
            {test.collectionName}
          </p>
          {slice.map((a) => (
            <MusicCard key={ a.trackId } musica={ a } />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
