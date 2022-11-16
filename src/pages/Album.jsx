import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    musica: [],
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
    });
  };

  render() {
    const { musica } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {musica.length === 0
          ? <Loading /> : (
            <div key={ musica[0].artistId }>
              <p data-testid="artist-name">{musica[0].artistName}</p>
              <p data-testid="album-name">{musica[0].collectionName}</p>
              <MusicCard musica={ musica.slice(1) } />
            </div>
          ) }
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
