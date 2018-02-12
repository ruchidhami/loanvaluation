export class Location {
  wardNo: string;
  vdc: string;
  district: string;
  typeOfLocation: string;
  shapeOfLand: string;
  nearestMarket: string;
  distanceFromHighway: string;
  highTensionLine: string;
  
  constructor(props: any) {
    this.wardNo = props.wardNo;
    this.vdc = props.vdc;
    this.district = props.district;
    this.typeOfLocation = props.typeOfLocation;
    this.shapeOfLand = props.shapeOfLand;
    this.nearestMarket = props.nearestMarket;
    this.distanceFromHighway = props.distanceFromHighway;
    this.highTensionLine = props.highTensionLine;
  }
}
