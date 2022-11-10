const users = [
  {
    id: 1,
    name: 'Woufu',
    email: 'woufu@aol.com',
    password: '123456',
    role: 'admin',
  },
];

export function findByEmail(email) {
  return Promise.resolve(users.find((user) => user.email === email));
}

export function findById(id) {
  return Promise.resolve(users.find((user) => user.id === id));
}

export function verifyPassword(password, user) {
  return Promise.resolve(password === user.password);
}

export default users;
