import { useState } from 'react';
import { createUser } from '../../services/userAPI';
import { useNavigate } from "react-router-dom";
import Loading from '../Loading';
import useHandleChange from '../../hooks/useHandleChange';
import "./style.css";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { value: { name }, onChange } = useHandleChange({ name: "" });
  const navigate = useNavigate();
  const NUMBER_THREE = 3;

  const users = async () => {
    setLoading(true);
    await createUser({ name });
    navigate('/search');
  };

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
              onChange={ onChange }
              data-testid="login-name-input"
            />
            <button
              type="button"
              className="login-button"
              data-testid="login-submit-button"
              onClick={ users }
              disabled={ name.length < NUMBER_THREE }
            >
              Entrar
            </button>
          </form>
        )}
    </div>
  );
}
