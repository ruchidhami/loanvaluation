export class CitizenShip{
  citizenshipNumber: string;
  issuedDate: string;
  issuedOffice: string;
  fatherName: string;
  motherName: string;
  spouse: string;
  fatherInLawName: string;
  
  constructor(props: any) {
    this.citizenshipNumber = props.citizenshipNumber;
    this.issuedDate = props.issuedDate;
    this.issuedOffice = props.issuedOffice;
    this.fatherName = props.fatherName;
    this.motherName = props.motherName;
    this.spouse = props.spouse;
    this.fatherInLawName = props.fatherInLawName;
    
  }
}
