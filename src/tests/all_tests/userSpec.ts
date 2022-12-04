import { User, UserStore } from '../../model/user';
import { generateToken } from '../../controller/authentication';

const user1OmmitedPassword: Omit<User, 'password'> = {
  id: 1,
  firstName: 'Abdulaziz',
  lastName: 'Alrabiah',
};

const user2OmmitedPassword: Omit<User, 'password'> = {
  id: 2,
  firstName: 'Abdulaziz2',
  lastName: 'Alrabiah2',
};

describe('User model tests', () => {
  it('expect to list all users in the database', async () => {
    const users = await UserStore.listAll();

    users.sort((a, b) => a.id - b.id);

    expect(users).toContain(user1OmmitedPassword);
    expect(users).toContain(user2OmmitedPassword);
  });

  it('expect to show user with id = 1', async () => {
    const user = await UserStore.showUserAt(1);

    expect(user).toEqual(user1OmmitedPassword);
  });

  it('expect to create a user and return a token', async () => {
    const newUser: Omit<User, 'id'> = {
      firstName: 'Abdulaziz4',
      lastName: 'Alrabiah4',
      password: 'Test123',
    };

    // Expected id is 4 for simplicity
    const newUser3OmmitedPassword: Omit<User, 'password'> = {
      id: 4,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };

    const expectedToken = generateToken(newUser3OmmitedPassword);

    const token = await UserStore.insertUser(newUser);

    expect(token).toEqual(expectedToken);
  });
});
