import { Router } from 'express';
import Multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = Multer(uploadConfig);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

usersRouter.use(ensureAuthenticated);

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
