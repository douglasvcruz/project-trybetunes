import { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    name: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name } = this.state;
    const num = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            id="name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            data-testid="search-artist-input"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ name.length < num }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
