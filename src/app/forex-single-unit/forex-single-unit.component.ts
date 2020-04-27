import { Component, OnInit, OnChanges, Input, Pipe, PipeTransform } from '@angular/core';
import { rate_change, exchange } from '../forex-unit/forex-unit.component';

@Component({
  selector: 'app-forex-single-unit',
  templateUrl: './forex-single-unit.component.html',
  styleUrls: ['./forex-single-unit.component.scss']
})
export class ForexSingleUnitComponent implements OnInit, OnChanges {

  private previousValue: 0

  _rateChange
  baseRate
  targetRate
  pairsDisplay: IPairsDisplay = {
    base: '',
    separator: '/',
    target: ''
  }
  baseFlagUrl
  targetFlagUrl
  private _rateName
  @Input()
  set rateName(val: any) {
    this._rateName = val
    this.pairsDisplay.base = this.getBaseRate(val)
    this.pairsDisplay.target = this.getTargetRate(val)
    this.getFlagsUrl(val)
  }
  get rateName(): any {
    return this._rateName;
  }

  private _rate: exchange
  @Input()
  set rate(val: any) {
    this._rate = val
    if (this.previousValue > this._rate.rate) { this._rateChange = rate_change.DOWN }
    else if (this.previousValue < this._rate.rate) { this._rateChange = rate_change.UP }
    else { this._rateChange = rate_change.DOWN.toString }
  }
  get rate(): any {
    return this._rate;
  }

  constructor() { this._rateChange = rate_change.STEADY.toString() }

  ngOnInit(): void {
  }

  ngOnChanges(change: any) {
    console.log('change: ', change)
  }

  getBaseRate(value: String) {
    return value.substr(0, 3)
  }

  getTargetRate(value: String) {
    return value.substr(3, 3)
  }

  getFlagsUrl(value) {
    this.baseFlagUrl = `https://www.countryflags.io/${value.substr(0, 2)}/shiny/64.png`
    this.targetFlagUrl = `https://www.countryflags.io/${value.substr(3, 2)}/shiny/64.png`
  }
  // getCountryCode(value) {
  //   https://www.countryflags.io/be/shiny/64.png
  //   return value.substr(0, 2)
  // }
}

interface IPairsDisplay {
  base: String,
  separator: '/',
  target: String
}

@Pipe({
  name: 'splitPair'
})
export class SplitPairPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value.substr(0, 3) + '\\' + value.substr(3, 3)
  }
}

@Pipe({
  name: 'baseSplitPair'
})
export class BaseSplitPairPipe implements PipeTransform {
  transform(value: any): any {
    return value.substr(0, 3)
  }
}

@Pipe({
  name: 'targetSplitPair'
})
export class TargetSplitPairPipe implements PipeTransform {
  transform(value: any): any {
    return value.substr(3, 3)
  }
}

@Pipe({
  name: 'fixedDecimalPipe'
})
export class FixedDecimalPipe implements PipeTransform {
  transform(value: any): any {
    return value.toFixed(5)
  }
}
