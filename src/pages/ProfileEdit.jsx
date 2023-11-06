import { Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import useHandleChange from '../hooks/useHandleChange';

export default function Profile() {
  const email = useHandleChange('');
  const name = useHandleChange('');
  const description = useHandleChange('');
  const image = useHandleChange('');
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const validateEmail = () => {
    const re = /\S+@\S+\.\S+/;
    const emailVerifica = re.test(email.value) && email.value.length !== 0;
    if (emailVerifica) {
      setDisabled(false);
    }
  };
  const getUsers = async () => {
    setLoading(true);
    const userInfo = await getUser();
    email.setValue(userInfo.email);
    name.setValue(userInfo.name);
    description.setValue(userInfo.description);
    image.setValue(userInfo.image);
    setLoading(false);
  };

  const getUpdate = async () => {
    setLoading(true);
    await updateUser({
      email: email.value,
      name: name.value,
      description: description.value,
      image: image.value,
    });
    setLoading(false);
    setUpdated(true);
  };

  useEffect(() => {
    validateEmail();
  }, [email]);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div data-testid="page-profile-edit">
      <Header />
      {loading ? <Loading />
        : (
          <div>
            <input
              type="text"
              data-testid="edit-input-image"
              value={ image.value }
              name="image"
              onChange={ image.handleChange }
            />
            <span>Nome</span>
            <input
              type="text"
              data-testid="edit-input-name"
              value={ name.value }
              name="name"
              onChange={ name.handleChange }
            />
            <span>E-mail</span>
            <input
              type="email"
              data-testid="edit-input-email"
              value={ email.value }
              name="email"
              onChange={ email.handleChange }
            />
            <span>Descrição</span>
            <input
              type="text"
              data-testid="edit-input-description"
              value={ description.value }
              name="description"
              onChange={ description.handleChange }
            />
            <button
              type="submit"
              data-testid="edit-button-save"
              disabled={ disabled }
              onClick={ getUpdate }
            >
              Salvar
            </button>
          </div>
        )}
      {updated && <Redirect to="/profile" />}
    </div>
  );
}
