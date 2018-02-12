import { Location } from './location';
import { Description } from './description';
import { Triangulation } from './triangulation';
import { PropertyValuation } from './propertyValuation';
import { LegalAspectsOfProperty } from './legalAspectsOfProperty';
import { Remarks } from './remarks';
import { Importance } from './importance';
import { OtherInfo } from './otherInfo';

export class Property {
  plotNo: string;
  location: Location;
  description: Description;
  triangulation: Triangulation;
  propertyValuation: PropertyValuation;
  legalAspectsOfProperty: LegalAspectsOfProperty;
  remarks: Remarks;
  importance: Importance;
  otherInfo: OtherInfo;

  constructor(props : any ) {
    this.plotNo = props.plotNo;
    this.location = props.location || new Location({});
    this.description = props.description || new Description({});
    this.triangulation = props.triangulation || new Triangulation({});
    this.propertyValuation = props.propertyValuation || new PropertyValuation({});
    this.legalAspectsOfProperty = props.legalAspectsOfProperty || new LegalAspectsOfProperty({});
    this.remarks = props.remarks || new Remarks({});
    this.importance = props.importance || new Importance({});
    this.otherInfo = props.otherInfo || new OtherInfo({});
  }
}
