import { Address } from './address';
import { CitizenShip } from './citizenShip';

export class Owner {
  fullName: string;
  address: Address;
  contactNumber: string;
  citizenshipInformation: CitizenShip;

  constructor(props: any) {
    this.fullName = props.fullName;
    this.address = props.address || new Address({});
    this.contactNumber = props.contactNumber;
    this.citizenshipInformation = props.citizenshipInformation || new CitizenShip({});
  }
}
