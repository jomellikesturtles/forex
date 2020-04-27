import { Component, OnInit, Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { ForexService } from '../forex.service';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-forex-unit',
  templateUrl: './forex-unit.component.html',
  styleUrls: ['./forex-unit.component.scss']
})
export class ForexUnitComponent implements OnInit {

  pairList = []
  exchangeList: exchange[] = []
  pairsSubscription = null
  currentTime = new Date()
  procLoading = true
  rateName = ''
  errorCallbackMessage = ''
  constructor(private forexService: ForexService,
  ) { }

  ngOnInit(): void {
    this.pairsSubscription = this.forexService.getPairs().subscribe(pairs => {
      this.pairList = pairs['supportedPairs']
      const pairListStr = this.pairList.join(',')
      this.procLoading = true

      this.forexService.getPairsValues(pairListStr).subscribe((e: forex_api_res) => {
        console.log('e')
        if (e.code === 200) {
          this.setFirstValues(e)
          setInterval(() => {
            // this.procLoading = true
            this.getPairValues(e)
          }, 20000)
        } else {
          this.errorCallbackMessage = e['message']
        }
      }, (error) => {
        console.log('inerror')
        this.errorCallbackMessage = error.message
      }, () => {
        this.procLoading = false
      })
    })
  }

  setFirstValues(e) {
    console.log(e)
    Object.entries(e.rates).forEach(rate => {
      const myObj = {
        name: rate[0],
        rate: rate[1]['rate'],
        timestamp: rate[1]['timestamp'],
        name2: rate[0].substr(3, 3) + rate[0].substr(0, 3),
        rate2: 1 / rate[1]['rate']
      }
      this.exchangeList.push(myObj)
    })
    this.procLoading = false
  }

  getPairValues(e) {
    // this.exchangeList = []
    this.currentTime = new Date()
    console.log(e)
    // this.currentTime = new Date(e.rates[0][1]['timestamp'])
    Object.entries(e.rates).forEach(rate => {

      // this.exchangeList.find(exUnit => exUnit.name = rate[0])
      this.exchangeList.forEach(exUnit => {
        if (exUnit.name === rate[0]) {
          const myObj = {
            name: rate[0],
            rate: rate[1]['rate'],
            timestamp: rate[1]['timestamp'],
            name2: rate[0].substr(3, 3) + rate[0].substr(0, 3),
            rate2: 1 / rate[1]['rate']
          }
          exUnit = myObj
          return
        }
      })
    })
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

interface forex_api_res {
  code: number
  rates: any[]
}

export enum rate_change {
  UP,
  DOWN,
  STEADY
}
