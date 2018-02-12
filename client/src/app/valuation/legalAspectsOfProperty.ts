export class LegalAspectsOfProperty {
  ownershipOfLand: string;
  ownershipComment: string;
  revenue: Revenue;
  normalValue: string;
  registrationDate: string;
  normalSale: NormalSale;
  plotIndicatedValue: string;
  clearlyMarkedValue: string;
  tallyInMap: TallyInMap;
  areaOfLand: AreaOfLand;
  boundaryParameters: BoundaryParameters;
  freeAccessValue: string;
  partNotifiedValue: string;
  boundary: Boundary;

  constructor(props: any) {
    this.ownershipOfLand = props.ownershipOfLand;
    this.ownershipComment = props.ownershipComment;
    this.revenue = props.revenue || new Revenue({});
    this.normalValue = props.normalValue;
    this.registrationDate = props.registrationDate;
    this.normalSale = props.normalSale || new NormalSale({});
    this.plotIndicatedValue = props.plotIndicatedValue;
    this.clearlyMarkedValue = props.clearlyMarkedValue;
    this.tallyInMap = props.tallyInMap || new TallyInMap({});
    this.areaOfLand = props.areaOfLand || new AreaOfLand({});
    this.boundaryParameters = props.boundaryParameters || new BoundaryParameters({});
    this.freeAccessValue = props.freeAccessValue;
    this.partNotifiedValue = props.partNotifiedValue;
    this.boundary = props.boudary || new Boundary({});
  }
}

class Revenue {
  paidValue: string;
  paymentDate: string;
  comments: string;

  constructor(props: any) {
    this.paidValue = props.paidValue;
    this.paymentDate = props.paymentDate;
    this.comments = props.comments;
  }
}

class NormalSale {
  value: string;
  comment: string;

  constructor(props: any) {
    this.value = props.value;
    this.comment = props.comment;
  }
}

class TallyInMap {
  value: string;
  comment: string;

  constructor(props: any) {
    this.value = props.value;
    this.comment = props.comment;
  }
}

class AreaOfLand {
  value: string;
  comment: string;

  constructor(props: any) {
    this.value = props.value;
    this.comment = props.comment;
  }
}

class BoundaryParameters {
  value: string;
  paymentReceipt: string;
  comment: string;

  constructor(props: any) {
    this.value = props.value;
    this.paymentReceipt = props.paymentReceipt;
    this.comment = props.comment;
  }
}

class Boundary {
  value: string;
  comment: string;

  constructor(props: any) {
    this.value = props.value;
    this.comment = props.comment;
  }
}
