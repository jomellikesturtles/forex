import {
  Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy
} from '@angular/core';
import { ForexService } from '../forex.service';
import * as supported_pairs from '../supported_pairs.json'
import * as iso_4217 from '../iso_4217.json'
import * as default_data from '../default_data.json'
import { Utils } from '../Utils'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-forex-compare',
  templateUrl: './forex-compare.component.html',
  styleUrls: ['./forex-compare.component.scss']
})
export class ForexCompareComponent implements OnInit {

  exchangeRate = 0

  selectedBaseFullName = 'US Dollar'
  selectedTargetFullName

  selectedBase = 'USD'
  selectedTarget = ''

  valueBase = 1
  valueTarget = 0

  baseFlagUrl = ''
  targetFlagUrl = ''

  procLoading = true
  procFetchRate = false
  rateName = ''
  codesList = []
  codesListWithoutUSD = []
  conversionMessage = 'Select a currency on the left.'
  lastUpdateTime = ''

  constructor(private forexService: ForexService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    supported_pairs.supportedPairs.forEach((e: String) => {
      const sub = e.substr(3, 3)
      if (this.codesList.indexOf(sub) === -1) {
        this.codesList.push(sub)
      }
    })

    this.codesListWithoutUSD = this.codesList // list without USD (USD Will be used in the first select element)
    const index = this.codesListWithoutUSD.indexOf('USD');
    if (index > -1) {
      this.codesListWithoutUSD.splice(index, 1);
    }
    this.cdr.detectChanges()
  }

  /**
   * Updates pair code from dropdown.
   * @param currencyCode actual value
   * @param type target or base
   */
  onUpdatePair(currencyCode: String, type: String) {
    const u = new Utils()
    this.conversionMessage = ''
    if (type === 'target') {
      this.procFetchRate = true
      const ratePair = `${this.selectedBase}${currencyCode}`
      this.forexService.getPairsValues(ratePair).subscribe((e: forex_api_res) => {
        if (e.code === 200 && e.rates) { // if successful
          this.exchangeRate = e.rates[ratePair]['rate']
          this.lastUpdateTime = u.getCurrentTimeAndDate(e.rates[ratePair]['timestamp'])
        } else {
          alert(
            "You are either offline or connection to API is limited. We will display the offline data instead."
          );
          const theRes = this.getOfflineSingle(ratePair)
          this.exchangeRate = theRes['rates'][ratePair]['rate']
          this.lastUpdateTime = u.getCurrentTimeAndDate(theRes['rates'][ratePair]['timestamp'])
        }
        this.selectedTargetFullName = this.getCurrencyName(currencyCode)
        this.conversionMessage = this.exchangeRate + ' ' + this.selectedTargetFullName
        this.calculateExchangeRate()
        this.procFetchRate = false
        this.cdr.detectChanges()
      })
    }
  }

  /**
   * Gets the offline data from the json file.
   * @param ratePair
   */
  getOfflineSingle(ratePair): any {
    let toReturn;
    Object.entries(default_data.rates).forEach((rate) => {
      if (rate[0] === ratePair) {
        toReturn = rate;
      }
    });
    toReturn = {
      rates: { [toReturn[0]]: toReturn[1] },
      code: 200,
    };
    return toReturn;
  }

  /**
   * Calculates the values.
   * @param e actual value
   * @param f target or base
   */
  onUpdatePairValues(e, f) {
    if (f === 'target') {
      this.valueBase = this.valueTarget / this.exchangeRate
    }
    else { // base
      this.valueTarget = this.exchangeRate * this.valueBase
    }
    this.cdr.detectChanges()
  }

  /**
   * Calculates the exchange rates.
   */
  calculateExchangeRate() {
    this.valueTarget = this.exchangeRate * this.valueBase
    this.cdr.detectChanges()
  }

  /**
   * Gets the full name of the currency based on the code. (ie. PHP returns Philippine Peso).
   * @returns currency name
   */
  getCurrencyName(val: String) {
    const ret = iso_4217['default']['list'].find(e => e.AlphabeticCode === val)
    if (ret.Currency) {
      return ret.Currency
    } else {
      return val
    }
  }

  /**
   * Updates the last update time
   * @param val
   */
  setLastUpdateTime(val) {
    const u = new Utils()
    this.lastUpdateTime = u.getCurrentTimeAndDate(val)
  }
}

export interface exchange {
  name?: String
  name2?: String
  rate: Number
  rate2: Number
  timestamp: Number
  previousRate?: Number
  rateChange?: rate_change
  [x: string]: any
}

export interface forex_api_res {
  code: number
  rates: any[]
}

export enum rate_change {
  UP,
  DOWN,
  STEADY
}
