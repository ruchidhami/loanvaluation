export class Address {
  wardNo: string;
  vdc: string;
  district: string;

  constructor(props: any) {
    this.wardNo = props.wardNo;
    this.vdc = props.vdc;
    this.district = props.district;
  }
}
