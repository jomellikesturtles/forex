import {
  Component, OnInit, Pipe, PipeTransform,
  ChangeDetectorRef, ChangeDetectionStrategy
} from '@angular/core';
import { ForexService } from '../forex.service';
import { pipe } from 'rxjs';
import * as default_data from '../default_data.json'
import * as supported_pairs from '../supported_pairs.json'
import * as iso_4217 from '../iso_4217.json'
import { Utils } from '../Utils'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-forex-unit',
  templateUrl: './forex-unit.component.html',
  styleUrls: ['./forex-unit.component.scss']
})
export class ForexUnitComponent implements OnInit {
  viewMode = 'grid'

  exchangeRate = 0

  selectedBaseFullName = 'US Dollar'
  selectedTargetFullName

  selectedBase = 'USD'
  selectedTarget = ''

  valueBase = 1
  valueTarget = 0

  baseFlagUrl = ''
  targetFlagUrl = ''

  pairList = []
  exchangeList: exchange[] = []
  pairsSubscription = null
  currentTime = new Date()
  procLoading = true
  procFetchRate = false
  rateName = ''
  errorCallbackMessage = ''
  codesList = []
  codesListWithoutUSD = []
  conversionMessage = 'Select a currency on the left.'
  lastUpdateTime = ''

  constructor(private forexService: ForexService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    supported_pairs.supportedPairs.forEach((e: String) => {
      const sub = e.substr(3, 3)
      if (this.codesList.indexOf(sub) === -1) {
        this.codesList.push(sub)
      }
    })

    this.codesListWithoutUSD = this.codesList
    const index = this.codesListWithoutUSD.indexOf('USD');
    if (index > -1) {
      this.codesListWithoutUSD.splice(index, 1);
    }

    this.cdr.detectChanges()

  }

  /**
   * Updates pair code from dropdown.
   * @param e actual value
   * @param f target or base
   */
  onUpdatePair(currencyCode: String, f: String) {
    const u = new Utils()
    this.conversionMessage = ''
    if (f === 'target') {
      this.procFetchRate = true
      // this.targetFlagUrl = u.getFlagUrl(e)
      const ratePair = `${this.selectedBase}${currencyCode}`
      this.forexService.getPairsValues(ratePair).subscribe((e: forex_api_res) => {
        if (e.code === 200 && e.rates) {
          this.exchangeRate = e.rates[ratePair]['rate']
          this.selectedTargetFullName = this.getCurrencyName(currencyCode)
          this.conversionMessage = this.exchangeRate + ' ' + this.selectedTargetFullName
          this.calculateExchangeRate()
          const u = new Utils()
          this.lastUpdateTime = u.getCurrentTimeAndDate(e.rates[ratePair]['timestamp'])
        } else {
          this.conversionMessage = 'Something went wrong.'
        }
        this.procFetchRate = false
        this.cdr.detectChanges()
      })
    }
    else {
      // this.baseFlagUrl = u.getFlagUrl(e)
    }
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

  calculateExchangeRate() {
    this.valueTarget = this.exchangeRate * this.valueBase
    this.cdr.detectChanges()
  }

  getCurrencyName(val: String) {
    const ret = iso_4217['default']['list'].find(e => e.AlphabeticCode === val)
    if (ret.Currency) {
      return ret.Currency
    } else {
      return val
    }
  }

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
