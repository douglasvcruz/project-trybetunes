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
            <div data-testid="header-user-name">
              {user}
              <div>
                <Link to="/search" data-testid="link-to-search">Search</Link>
                <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
                <Link to="/profile" data-testid="link-to-profile">Profile</Link>
              </div>
            </div>
          )}
      </header>
    );
  }
}
