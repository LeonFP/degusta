import User from '../models/User';

class UserController {
  async store(request, response) {
    const userExists = await User.findOne({
      where: { email: request.body.email },
    });

    if (userExists) {
      return response.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email } = await User.create(request.body);

    return response.json({
      id,
      name,
      email,
    });
  }

  async update(request, response) {
    const { email, oldPassword } = request.body;

    const user = await User.findByPk(request.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return response.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return response.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name } = await user.update(request.body);

    return response.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
