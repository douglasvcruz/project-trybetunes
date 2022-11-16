import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends Component {
  state = {
    name: '',
    guardar: '',
    loading: false,
    hide: false,
    items: [],
  };

  searchApi = async () => {
    const { name } = this.state;

    this.setState({
      loading: true,
      guardar: name,
    });

    const items = await searchAlbumsAPI(name);
    this.setState({
      name: '',
      items,
      loading: false,
      hide: true,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name, items, loading, guardar, hide } = this.state;
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
              value={ name }
              onChange={ this.handleChange }
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
            />
            <button
              className="search-button"
              type="button"
              data-testid="search-artist-button"
              disabled={ name.length < num }
              onClick={ this.searchApi }
            >
              Pesquisar
            </button>
          </form>
        )}
        {items.length !== 0 && (
          <h1>
            Resultado de álbuns de:
            {` ${guardar}`}
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
}
