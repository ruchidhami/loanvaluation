import { Injectable } from '@angular/core';

@Injectable()
/*
Ropani = 16 aana (आना) (about 508.72 m² or 5476 sq. ft.)
aana = 4 paisa (पैसा) (about 31.80 m² or 342.25 sq.ft.)
paisa = 4 daam (दाम) (7.95 m²)
let d = 1.9875 sq. m
let p = 7.95 sq. m
let a = 31.80 sq. m
let r = 508.72 sq. m
*/
class NPLandUnit {
    constructor(
        public daam: number,
        public paisa: number,
        public anna: number,
        public ropani: number)
    { }
}
class ConverterService {
    //RAPD = Ropani - Aana - Paisa - Daam

    convertSqMeterAreaIntoRAPD(areaInSquareMeter): NPLandUnit {

        //Convert Into Daam
        let totalDaam = parseInt(areaInSquareMeter) / 1.9875;

        let daam = +(totalDaam % 4).toFixed(4);

        //Get Total paisa
        let totalPaisa = Math.floor(totalDaam / 4);

        let paisa = totalPaisa % 4;

        let totalAnna = Math.floor(totalPaisa / 4);

        let anna = totalAnna % 16;

        let ropani = Math.floor(totalAnna / 16);

        let unit = new NPLandUnit(daam, paisa, anna, ropani);

        return unit;
    }

    convertRAPDIntoSqMeter(unit: NPLandUnit) {
        var areaInSqMeter =  unit.daam * 1.9875 + unit.paisa * 7.95 + unit.anna * 31.80 + unit.ropani * 508.72;
        return +areaInSqMeter.toFixed(4);

    }

    sqmeterToAnna(areaInSqMeter):number {
       return +(areaInSqMeter / 31.80).toFixed(2);
    }
}

export {
    ConverterService, NPLandUnit
}