export class TotalLandAreaPerMeasurement {
  sideA: string;
  sideB: string;
  sideC: string;
  total: string;

  constructor(props: any) {
    this.sideA = props.sideA;
    this.sideB = props.sideB;
    this.sideC = props.sideC;
    this.total= props.total;
  }
}
