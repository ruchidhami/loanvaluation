import { Injectable } from '@angular/core';

@Injectable()

class CalculationService {

  areaInfo(asPerLalPurjaRAPD, asPerMeasurementRAPD,totalAreaTriangulation) {
    var areaConsidered = +asPerLalPurjaRAPD.total > +totalAreaTriangulation ? asPerMeasurementRAPD : asPerLalPurjaRAPD;

    return  [
      {
        "title": "As Per LalPurja",
        "value": asPerLalPurjaRAPD
      },
      {
        "title": "As Per Measurement",
        "value": asPerMeasurementRAPD
      },
      {
        "title": "As Considered for valuation",
        "value": areaConsidered
      },
    ]
  }

  inWords(input) {
    const arr = x => Array.from(x);
    const num = x => Number(x) || 0;
    const str = x => String(x);
    const isEmpty = xs => xs.length === 0;
    const take = n => xs => xs.slice(0, n);
    const drop = n => xs => xs.slice(n);
    const reverse = xs => xs.slice(0).reverse();
    const comp = f => g => x => f(g(x));
    const not = x => !x;
    const chunk = n => xs =>
      isEmpty(xs) ? [] : [take(n)(xs), ...chunk(n)(drop(n)(xs))];
    let numToWords = n => {
      let a = [
        '', 'one', 'two', 'three', 'four',
        'five', 'six', 'seven', 'eight', 'nine',
        'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
        'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
      ];
      let b = [
        '', '', 'twenty', 'thirty', 'forty',
        'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
      ];
      let g = [
        '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
        'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'
      ];
      // this part is really nasty still
      // it might edit this again later to show how Monoids could fix this up
      let makeGroup = ([ones, tens, huns]) => {
        return [
          num(huns) === 0 ? '' : a[huns] + ' hundred ',
          num(ones) === 0 ? b[tens] : b[tens] && b[tens] + '-' || '',
          a[tens + ones] || a[ones]
        ].join('');
      };
      // "thousands" constructor; no real good names for this, i guess
      let thousand = (group, i) => group === '' ? group : `${group} ${g[i]}`;
      // execute !
      if (typeof n === 'number') return numToWords(String(n));
      if (n === '0') return 'zero';
      return comp(chunk(3))(reverse)(arr(n))
        .map(makeGroup)
        .map(thousand)
        .filter(comp(not)(isEmpty))
        .reverse()
        .join(' ');
    };

    return numToWords(input);
  }

  totalDepreciation(buildingAge) {
    return (buildingAge * 1.5);
  }

  totalAmount(valueOfBuilding) {
    var totalAmount = 0;
    for (let f of valueOfBuilding) {
      totalAmount = totalAmount + +(f.area * f.rate)
    }
    return totalAmount;
  }

  tenPercent(total) {
    return 0.1 * total;
  }

  totalFloorArea(valueOfBuilding) {
    var totalArea = 0;
    for (let f of valueOfBuilding) {
      totalArea = totalArea + +f.area;
    }
    return totalArea;
  }
}

export {
  CalculationService
}
