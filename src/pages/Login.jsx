import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import useHandleChange from '../hooks/useHandleChange';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const name = useHandleChange('');
  const history = useHistory();

  const users = async () => {
    setLoading(true);
    await createUser({ name: name.value });
    history.push('search');
  };

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
              value={ name.value }
              onChange={ name.handleChange }
              data-testid="login-name-input"
            />
            <button
              type="button"
              className="login-button"
              data-testid="login-submit-button"
              onClick={ users }
              disabled={ name.value.length < num }
            >
              Entrar
            </button>
          </form>
        )}
    </div>
  );
}
