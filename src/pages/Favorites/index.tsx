import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import { Song } from '../../interfaces/iSong';
import Header from '../../components/Header';
import MusicCard from '../../components/MusicCard';
import Loading from '../Loading';
import "./style.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  const saveFavorites = async () => {
    setLoading(true);
    const favoriteSongs: Song[] = await getFavoriteSongs();
    setFavorites(favoriteSongs);
    setLoading(false);
  };

  useEffect(() => {
    saveFavorites();
  }, []);

  return (
    <div data-testid="page-favorites">
      <Header />
      <div className="div-favorites">
        {loading ? <Loading /> : (
          favorites.map((a) => (
            <MusicCard
              key={ a.trackId }
              music={ a }
              func={ saveFavorites }
            />
          ))
        )}
      </div>
    </div>
  );
}
