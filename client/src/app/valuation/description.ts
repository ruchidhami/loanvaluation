export class Description {
  typeOfOwnership: string;
  levelOfLand: string;
  topographyOfLand: string;
  natureOfSoil: string;
  accessOfLand: string;
  constructionOnLand: string;
  sewerFacility: string;
  waterFacility: string;
  electricitySupply: string;
  nature: string;
  
  constructor(props : any ) {
    this.typeOfOwnership = props.typeOfOwnership;
    this.levelOfLand = props.levelOfLand;
    this.topographyOfLand = props.topographyOfLand;
    this.natureOfSoil = props.natureOfSoil;
    this.accessOfLand = props.accessOfLand;
    this.constructionOnLand = props.constructionOnLand;
    this.sewerFacility = props.sewerFacility;
    this.waterFacility = props.waterFacility;
    this.electricitySupply = props.electricitySupply;
    this.nature = props.nature;
  }
}
