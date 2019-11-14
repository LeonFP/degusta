import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (request, response) => {
  const user = await User.create({
    name: 'Leonardo Pinheiro',
    email: 'leo.pinnheiro@gmail.com',
    password_hash: '123',
  });
  return response.json(user);
});

export default routes;
