import { Router } from 'express';
import { refreshTokenRouter } from './refreshToken';
import { signinRouter } from './signin';
import { signupRouter } from './signup';
import { body } from 'express-validator';
import { validateRequest } from '../../core/middlewares/validate-request';

const router = Router();

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 8, max: 16 })
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  signinRouter(),
);

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  signupRouter(),
);

router.post(
  '/refresh-token',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('refreshToken').notEmpty(),
  ],
  validateRequest,
  refreshTokenRouter(),
);

export { router as userRouter };
