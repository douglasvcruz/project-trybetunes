import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import getSongs from '../../services/musicsAPI';
import MusicCard from '../../components/MusicCard';

type Album = {
  trackId: string;
  artistName: string;
  collectionName: string;
  trackName: string;
  previewUrl: string;
}

export default function Album() {
  const [saveAlbum, setSaveName] = useState<Album>({  artistName: "", collectionName: "", trackId: "", previewUrl: "", trackName: "" });
  const [songs, setSongs] = useState<Album[]>([]);
  type QuizParams = {
    id: string;
  }
  const { id } = useParams<QuizParams>();

  const getSong = async () => {
    const song = await getSongs(id);
    setSongs(song);
    setSaveName(song[0]);
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
          {saveAlbum.artistName}
        </p>
        <p
          className="album-name"
          data-testid="album-name"
        >
          {saveAlbum.collectionName}
        </p>
        {songs.slice(1).map((a) => (
          <MusicCard key={ a.trackId } music={ a } />
        ))}
      </div>
    </div>
  );
}
