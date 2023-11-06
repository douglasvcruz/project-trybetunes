import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  const getUsers = async () => {
    setLoading(true);
    const userInfo = await getUser();
    setLoading(false);
    setUser(userInfo);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const { image, description, email, name } = user;
  return (
    <div data-testid="page-profile">
      <Header />
      { loading ? <Loading /> : (
        <div>
          <img data-testid="profile-image" src={ image } alt={ name } />
          <br />
          <Link to="/profile/edit">Editar perfil</Link>
          <br />
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
