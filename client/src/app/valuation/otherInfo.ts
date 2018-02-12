export  class OtherInfo {
  bankName: string;
  bankAddress: string;
  preparedBy: string;
  reportDate: string;

  constructor(props : any) {
    this.bankName = props.bankName;
    this.bankAddress = props.bankAddress;
    this.preparedBy = props.preparedBy;
    this.reportDate = props.reportDate;
  }
}
