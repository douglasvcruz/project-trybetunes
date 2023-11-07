const USER_KEY = 'user';
const TIMEOUT = 1500;
const SUCCESS_STATUS = 'OK';

export type User = {
  name: string,
  email?: string,
  image?: string,
  description?: string,
}

const readUser = () => JSON.parse(localStorage.getItem(USER_KEY) || "");
const saveUser = (user: User) => localStorage.setItem(USER_KEY, JSON.stringify(user));

// --------------------------------------------------------------------
// A função simulateRequest simula uma requisição para uma API externa
// Esse tipo de função que "chama outra função" é chamada de
// "currying function" https://javascript.info/currying-partials
// não se preocupe, estudaremos isso mais futuramente
// --------------------------------------------------------------------

const simulateRequest = (response: string) => (callback: (response: string) => void) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getUser = (): Promise<User> => new Promise<User>((resolve) => {
  // readUser deve ser adaptado para sempre retornar um User ou null
  let user: User | null = readUser();
  if (user === null) {
    user = { name: '', email: '', image: '', description: '' };
  }
  // Precisa converter 'user' para string antes de passar para simulateRequest
  simulateRequest(JSON.stringify(user))((response: string) => {
    // Converte a resposta de volta para o tipo User antes de resolver
    resolve(JSON.parse(response));
  });
});

export const createUser = (user: User) => new Promise<string>((resolve) => {
  const emptyUser = {
    name: '',
    email: '',
    image: '',
    description: '',
  };
  saveUser({ ...emptyUser, ...user });
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const updateUser = (updatedUser: User) => new Promise((resolve) => {
  saveUser({ ...updatedUser });
  simulateRequest(SUCCESS_STATUS)(resolve);
});
