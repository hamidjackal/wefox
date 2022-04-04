import request from 'supertest';
import { app } from '../../../app';

it('Get weather of a location', async () => {
  const token = await global.signin();
  await request(app)
    .post('/api/address-services/weather')
    .set('token', token)
    .send({ lat: 12.5, lon: 51.6 })
    .expect(200);
});
