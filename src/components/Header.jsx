import { Component } from 'react';
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
            </div>
          )}
      </header>
    );
  }
}
