import { Component, OnInit } from '@angular/core';
import * as default_data from '../default_data.json'
import * as supported_pairs from '../supported_pairs.json'
import * as iso_4217 from '../iso_4217.json'
import { Utils } from '../Utils'
import { forex_api_res } from '../forex-unit/forex-unit.component';

@Component({
  selector: 'app-forex-multi',
  templateUrl: './forex-multi.component.html',
  styleUrls: ['./forex-multi.component.scss']
})
export class ForexMultiComponent implements OnInit {
  [x: string]: any;

  constructor() {
    console.log('super constructor')
  }

  ngOnInit(): void {
    console.log('inSUPERF')
  }

  getOfflineData() {
    alert('You are either offline or connection to API is limited. We will display the offline data instead.')
    let exchangeList = []
    Object.entries(default_data.rates).forEach(rate => {
      const myObj = {
        name: rate[0],
        rate: rate[1]['rate'],
        rate2: 1 / rate[1]['rate'],
        timestamp: rate[1]['timestamp'],
        curr1: rate[0].substr(0, 3),
        curr2: rate[0].substr(3, 3),
      }
      exchangeList.push(myObj)
    })
    return exchangeList
  }


  getRateValue(rate) {
    const myObj = {
      name: rate[0],
      name2: rate[0].substr(3, 3) + rate[0].substr(0, 3),
      rate: rate[1]['rate'],
      rate2: 1 / rate[1]['rate'],
      timestamp: rate[1]['timestamp'],
      curr1: rate[0].substr(0, 3),
      curr2: rate[0].substr(3, 3),
    }
    return myObj
  }

}
