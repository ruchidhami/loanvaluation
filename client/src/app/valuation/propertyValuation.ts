export class PropertyValuation {
  marketRate: string;
  governmentRate: string;
  percentage: string;
  
  constructor(props: any) {
    this.marketRate = props.marketRate;
    this.governmentRate = props.governmentRate;
    this.percentage = props.percentage;
  }
}
