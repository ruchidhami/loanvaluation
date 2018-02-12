import { Client } from './client';

export class Valuation {
  typeOfProperty: string;
  statusOfReport: string;
  client: Client;
  owner: string;
  property: string;

  constructor(props: any) {
    this.typeOfProperty = props.typeOfProperty;
    this.statusOfReport = props.statusOfReport;
    this.client = props.client || new Client({});
    this.owner = props.owner;
    this.property = props.property;
  }
}
