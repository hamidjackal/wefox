import request from 'supertest';
import { app } from '../../../app';

it('Validate address', async () => {
  await request(app)
    .post('/api/address-services/validate')
    .send({
      streetNumber: '135',
      steertName: 'Pilkington Avenue',
      town: 'birmingham',
      state: '',
      postalCode: 'B72',
      country: 'United Kingdom',
    })
    .expect(200);
});
