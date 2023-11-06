import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import getSongs from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default function Album() {
  const [music, setMusic] = useState([]);
  const [test, setTest] = useState([]);
  const { id } = useParams();

  const getSong = async () => {
    const song = await getSongs(id);
    setMusic(song);
    setTest(song[0]);
  };

  useEffect(() => {
    getSong();
  }, []);

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
        {music.slice(1).map((a) => (
          <MusicCard key={ a.trackId } music={ a } />
        ))}
      </div>
    </div>
  );
}
