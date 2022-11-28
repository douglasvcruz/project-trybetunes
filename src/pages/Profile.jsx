import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Profile extends Component {
  state = {
    loading: false,
    armazena: [],
  };

  componentDidMount() {
    this.user();
  }

  user = async () => {
    this.setState({
      loading: true,
    });
    const userInfo = await getUser();
    this.setState({
      armazena: userInfo,
      loading: false,
    });
  };

  render() {
    const { loading, armazena } = this.state;
    const { image, description, email, name } = armazena;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading /> : (
          <div>
            <img data-testid="profile-image" src={ image } alt={ name } />
            <Link to="/profile/edit">Editar perfil</Link>
            <span>Nome</span>
            <p>{name}</p>
            <span>E-mail</span>
            <p>{email}</p>
            <span>Descrição</span>
            <p>{description}</p>
          </div>
        )}
      </div>
    );
  }
}
