import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = {
    loading: true,
    user: '',
  };

  componentDidMount() {
    this.users();
  }

  users = async () => {
    const user = await getUser();

    this.setState({
      loading: false,
      user: user.name,
    });
  };

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading
          ? <Loading />
          : (
            <div className="username" data-testid="header-user-name">
              <div className="div-user">
                <p className="trybe">Trybe</p>
                <p className="douglas">
                  {`Usuário: ${user}`}
                </p>
              </div>
              <Link
                to="/search"
                data-testid="link-to-search"
                className="search"
              >
                Search
              </Link>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
                className="favorites"
              >
                Favorites
              </Link>
              <Link
                to="/profile"
                data-testid="link-to-profile"
                className="profile"
              >
                Profile
              </Link>
            </div>
          )}
      </header>
    );
  }
}
