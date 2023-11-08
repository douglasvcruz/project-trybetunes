import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, updateUser } from "../../services/userAPI";
import Header from "../../components/Header";
import Loading from "../Loading";
import useHandleChange from "../../hooks/useHandleChange";

export default function Profile() {
  const {
    value: { email, name, description, image },
    onChange,
    setValue,
  } = useHandleChange({ email: "", name: "", description: "", image: "" });
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const validateEmail = () => {
    const re = /\S+@\S+\.\S+/;
    const emailVerifica = re.test(email) && email.length !== 0;
    if (emailVerifica) {
      setDisabled(false);
    }
  };
  const getUsers = async () => {
    setLoading(true);
    const userInfo = await getUser();
    setValue({
      name: userInfo.name,
      email: userInfo.email || "",
      description: userInfo.description || "",
      image: userInfo.image || "",
    });
    setLoading(false);
  };

  const getUpdate = async () => {
    setLoading(true);
    await updateUser({
      email,
      name,
      description,
      image,
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
      {loading ? (
        <Loading />
      ) : (
        <div>
          <input
            type="text"
            data-testid="edit-input-image"
            value={image}
            name="image"
            onChange={onChange}
          />
          <span>Nome</span>
          <input
            type="text"
            data-testid="edit-input-name"
            value={name}
            name="name"
            onChange={onChange}
          />
          <span>E-mail</span>
          <input
            type="email"
            data-testid="edit-input-email"
            value={email}
            name="email"
            onChange={onChange}
          />
          <span>Descrição</span>
          <input
            type="text"
            data-testid="edit-input-description"
            value={description}
            name="description"
            onChange={onChange}
          />
          <button
            type="submit"
            data-testid="edit-button-save"
            disabled={disabled}
            onClick={getUpdate}
          >
            Salvar
          </button>
        </div>
      )}
      {updated && <Navigate to="/profile" />}
    </div>
  );
}
