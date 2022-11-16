import { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  state = {
    loading: false,
    name: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  users = async () => {
    const { name } = this.state;
    const { history } = this.props;

    this.setState({
      loading: true,
    });

    await createUser({ name });
    history.push('search');
  };

  render() {
    const { name, loading } = this.state;
    const num = 3;
    return (
      <div data-testid="page-login">
        { loading ? <Loading />
          : (
            <form className="form">
              <input
                className="login-text"
                type="text"
                id="name"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                data-testid="login-name-input"
              />
              <button
                type="button"
                className="login-button"
                data-testid="login-submit-button"
                onClick={ this.users }
                disabled={ name.length < num }
              >
                Entrar
              </button>
            </form>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
