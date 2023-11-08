import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../../pages/Loading';
import "./style.css";

function Header() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState('');

  const users = async () => {
    const newUser = await getUser();
    setLoading(false);
    setUser(newUser.name);
  };

  useEffect(() => {
    users();
  }, []);

  return (
    <header data-testid="header-component">
      {loading
        ? <Loading />
        : (
          <div className="username" data-testid="header-user-name">
            <div className="div-user">
              <p className="trybe">Trybe</p>
              <p className="douglas">
                {user}
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

export default Header;
