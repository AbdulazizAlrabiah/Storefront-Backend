import express from 'express';
import { User, UserStore } from '../../model/user';
import { validateNotEmptyOrNull } from '../../controller/validator';

export async function getAllUsers(
  req: express.Request,
  res: express.Response
): Promise<void> {
  try {
    const users = await UserStore.listAll();
    res.status(200).json(users);
  } catch {
    res.status(500).send('Server error, please try again');
  }
}

export async function getUser(
  req: express.Request,
  res: express.Response
): Promise<void> {
  try {
    const user = await UserStore.showUserAt(
      parseInt(req.params['id'] as string)
    );

    if (validateNotEmptyOrNull(user?.id)) {
      res.status(200).json(user);
    } else {
      res.status(404).json('User not found');
    }
  } catch {
    res.status(500).send('Server error, please try again');
  }
}

export async function createUser(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const newUser: Omit<User, 'id'> = {
    firstName: req.body['firstName'],
    lastName: req.body['lastName'],
    password: req.body['password'],
  };

  if (
    !validateNotEmptyOrNull(
      newUser.firstName,
      newUser.lastName,
      newUser.password
    )
  ) {
    res
      .status(400)
      .send(
        'Please enter all the required fields (firstName, lastName and password)'
      );
    return;
  }

  console.log(newUser);

  try {
    const token = await UserStore.insertUser(newUser);
    res.json(token).status(200);
  } catch {
    res.status(400).json('Error in request');
  }
}
