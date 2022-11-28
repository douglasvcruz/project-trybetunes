import { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

export default class Favorites extends Component {
  state = {
    loading: false,
    guardando: [],
  };

  componentDidMount() {
    this.favorito();
  }

  favorito = async () => {
    this.setState({
      loading: true,
    });
    const musicFavorite = await getFavoriteSongs();
    this.setState({
      guardando: musicFavorite,
      loading: false,
    });
  };

  render() {
    const { guardando, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="div-favorites">
          { loading ? <Loading /> : (
            guardando.map((a) => (
              <MusicCard
                key={ a.trackId }
                musica={ a }
                func={ this.favorito }
              />
            ))
          )}
        </div>
      </div>
    );
  }
}
