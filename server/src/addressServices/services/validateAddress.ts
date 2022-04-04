import { AddressBody } from '../dtos/address-body.dto';
import axios from 'axios';
import { AddressBuilder } from './address-builder';
import { RedisClient } from '../../core/db/redis';
import { validateAddressUrl } from '../../config';

const validateAddress = async (body: AddressBody) => {
  const addressBuilder = new AddressBuilder(body);
  const address = addressBuilder
    .streetNumber()
    .streetName()
    .town()
    .state()
    .postalCode()
    .country()
    .get();

  const cacheManager = new RedisClient();

  const cahceValue = await cacheManager.getData(address);
  if (cahceValue) {
    return cahceValue === 'true';
  } else {
    const response = await axios.get(validateAddressUrl, {
      params: {
        q: address,
        format: 'geojson',
        limit: 1,
      },
    });
    const result = !!response.data?.features?.length;
    if (cacheManager) await cacheManager.setData(address, String(result));
    return result;
  }
};

export { validateAddress };
