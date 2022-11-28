import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

export default class Profile extends Component {
  state = {
    loading: false,
    email: '',
    name: '',
    description: '',
    image: '',
    updated: false,
  };

  componentDidMount() {
    this.user();
  }

  error = () => {
    const { email } = this.state;

    const re = /\S+@\S+\.\S+/;
    const emailVerifica = re.test(email) && email.length !== 0;

    return !emailVerifica;
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  user = async () => {
    this.setState({
      loading: true,
    });
    const userInfo = await getUser();
    this.setState({
      email: userInfo.email,
      name: userInfo.name,
      description: userInfo.description,
      image: userInfo.image,
      loading: false,
    });
  };

  update = async () => {
    const { email, name, description, image } = this.state;
    this.setState({
      loading: true,
    });
    await updateUser({ email, name, description, image });
    this.setState({
      updated: true,
      loading: false,
    });
  };

  render() {
    const { loading, image, description,
      email, name, updated } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? <Loading />
          : (
            <div>
              <input
                type="text"
                data-testid="edit-input-image"
                value={ image }
                name="image"
                onChange={ this.onInputChange }
              />
              <span>Nome</span>
              <input
                type="text"
                data-testid="edit-input-name"
                value={ name }
                name="name"
                onChange={ this.onInputChange }
              />
              <span>E-mail</span>
              <input
                type="email"
                data-testid="edit-input-email"
                value={ email }
                name="email"
                onChange={ this.onInputChange }
              />
              <span>Descrição</span>
              <input
                type="text"
                data-testid="edit-input-description"
                value={ description }
                name="description"
                onChange={ this.onInputChange }
              />
              <button
                type="submit"
                data-testid="edit-button-save"
                disabled={ this.error() }
                onClick={ this.update }
              >
                Salvar
              </button>
            </div>
          )}
        { updated && <Redirect to="/profile" /> }
      </div>
    );
  }
}
