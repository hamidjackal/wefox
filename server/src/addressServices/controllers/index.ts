import { Router } from 'express';
import { weatherRouter } from './weather';
import { validateAddressRouter } from './validateAddress';
import { authorizeRequest } from '../../users/middlewares/authorize-request';
import { body } from 'express-validator';
import { validateRequest } from '../../core/middlewares/validate-request';

const router = Router();

router.post(
  '/validate',
  [
    body('streetName')
      .isString()
      .withMessage('streetName should be string')
      .optional(),
    body('streetNumber')
      .isString()
      .withMessage('streetNumber is requireds')
      .optional(),
    body('town').isString().withMessage('town is requireds').optional(),
    body('postalCode')
      .isString()
      .withMessage('postCode is requireds')
      .optional(),
    body('country').isString().withMessage('country is requireds').optional(),
  ],
  validateRequest,
  validateAddressRouter(),
);

router.post(
  '/weather',
  [
    body('lat').isNumeric().withMessage('lat is requireds'),
    body('lon').isNumeric().withMessage('lon is requireds'),
  ],
  validateRequest,
  authorizeRequest,
  weatherRouter(),
);

export { router as addressRouter };
