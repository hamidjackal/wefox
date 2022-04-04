import { AddressBody } from '../dtos/address-body.dto';

export class AddressBuilder {
  private addressObj: AddressBody;
  private address: string[] = [];

  constructor(addressObj: AddressBody) {
    this.addressObj = addressObj;
  }

  streetNumber() {
    if (this.addressObj.streetNumber)
      this.address.push(`${this.addressObj.streetNumber}, `);
    return this;
  }
  streetName() {
    if (this.addressObj.streetName)
      this.address.push(`${this.addressObj.streetName}, `);
    return this;
  }
  town() {
    if (this.addressObj.town) this.address.push(`${this.addressObj.town}, `);
    return this;
  }
  state() {
    if (this.addressObj.state) this.address.push(`${this.addressObj.state}, `);
    return this;
  }
  country() {
    if (this.addressObj.country)
      this.address.push(`${this.addressObj.country}`);
    return this;
  }
  postalCode() {
    if (this.addressObj.postalCode)
      this.address.push(`${this.addressObj.postalCode}, `);
    return this;
  }
  comma() {
    this.address.push(',');
    return this;
  }
  space() {
    this.address.push(' ');
    return this;
  }
  get() {
    return this.address.join('').trim();
  }
}
