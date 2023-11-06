import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import useHandleChange from '../hooks/useHandleChange';

export default function Search() {
  const name = useHandleChange('');
  const [hide, setHide] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveName, setSaveName] = useState('');

  const searchApi = async () => {
    setLoading(true);
    setSaveName(name.value);
    const albumItems = await searchAlbumsAPI(name.value);
    setItems(albumItems);
    name.setValue('');
    setLoading(false);
    setHide(true);
  };

  useEffect(() => {
    searchApi();
  }, []);

  const num = 2;
  return (
    <div data-testid="page-search">
      <Header />
      { loading ? <Loading /> : (
        <form className="search-form">
          <input
            className="search-text"
            type="text"
            id="name"
            name="name"
            value={ name.value }
            onChange={ name.handleChange }
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
          />
          <button
            className="search-button"
            type="button"
            data-testid="search-artist-button"
            disabled={ name.value.length < num }
            onClick={ searchApi }
          >
            Pesquisar
          </button>
        </form>
      )}
      {items.length !== 0 && (
        <h1>
          Resultado de álbuns de:
          {` ${saveName}`}
        </h1>
      )}
      <div className="div">
        { items.length === 0 && hide && (
          <h1
            className="nothing"
          >
            Nenhum álbum foi encontrado
          </h1>
        )}
        {
          items.map(({ artistName, collectionName, collectionId, artworkUrl100 }) => (
            <div key={ collectionId } className="items">
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >
                <img src={ artworkUrl100 } alt={ artistName } />
                <p>{collectionName}</p>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
}
