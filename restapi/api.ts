import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import {v4 as uuidv4} from 'uuid';

const api:Router = express.Router()

interface User {
    id: string;
    name: string;
    email: string;
    friends: Array<string>;
}

//This is not a restapi as it mantains state but it is here for
//simplicity. A database should be used instead.
let users: Array<User> = [];

api.get(
    "/users/list",
    async (req: Request, res: Response): Promise<Response> => {
        // return res.status(200).send(users);

        const userList = users.map((user, index) => {
          return { id: user.id, name: user.name, email: user.email };
        });
        return res.status(200).send(userList);
    }
);



api.post(
  "/users/add",[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
  ],
  async (req: Request, res: Response): Promise<Response> => {
    let name = req.body.name;
    let email = req.body.email;
    let user: User = {id: uuidv4(),name:name,email:email,friends:[]}
    users.push(user);
    return res.sendStatus(200);
  }
);



api.get(
  "/users/:userId/friends",
  async (req: Request, res: Response): Promise<Response> => {
      const userId = req.params.userId;
      const user = users.find(user => user.id === userId);
      if (!user) {
          return res.status(404).send('User not found');
      }
      const friends = user.friends;
      return res.status(200).send(friends);
  }
);


api.post(
  "/users/:userId/add-friend",
  [
    check('friendId').isUUID().withMessage('friendId must be a valid UUID'),
  ],
  async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.userId;
    const friendId = req.body.friendId;

    // Buscar el usuario correspondiente al ID
    const user = users.find((user) => user.id === userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const friend = users.find((user) => user.id === friendId);
    if (!friend) {
      return res.status(404).send({ message: 'Friend to be added not found' });
    }

    // Añadir el amigo a la lista de amigos del usuario
    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
    }

    return res.status(200).send(user);
  }
);





export default api;