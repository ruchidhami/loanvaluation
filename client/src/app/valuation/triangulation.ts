import { TotalLandAreaPerMeasurement } from './totalLandAreaPerMeasurement'

export class Triangulation {
  numberOfTriangle: string;
  unitOfMeasurement: string;
  totalLandAreaPerMeasurement: TotalLandAreaPerMeasurement;
  
  constructor(props: any) {
    this.numberOfTriangle = props.numberOfTriangle;
    this.unitOfMeasurement = props.unitOfMeasurement;
    this.totalLandAreaPerMeasurement = props.totalLandAreaPerMeasurement || new TotalLandAreaPerMeasurement({});
  }
}
