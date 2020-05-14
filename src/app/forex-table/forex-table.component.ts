import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import * as supported_pairs from '../supported_pairs.json'
import { ForexService } from '../forex.service';
import { forex_api_res } from '../interfaces';
import { ForexMultiComponent } from '../forex-multi/forex-multi.component';

@Component({
  selector: 'app-forex-table',
  templateUrl: './forex-table.component.html',
  styleUrls: ['./forex-table.component.scss']
})
export class ForexTableComponent extends ForexMultiComponent implements OnInit {

  @Output() childUpdateTime = new EventEmitter<any>()
  exchangeList = []
  errorCallbackMessage = ''
  procLoading = false

  constructor(private forexService: ForexService, private cdr: ChangeDetectorRef) { super() }

  ngOnInit(): void {
    this.getAllValues()
  }

  /**
   * Gets all the forex values.
   */
  getAllValues() {
    this.procLoading = true
    const pairListStr = supported_pairs.supportedPairs.join(',')
    this.forexService.getPairsValues(pairListStr).subscribe((e: forex_api_res) => {
      if (e.code === 200) {
        this.setFirsPairtValues(e)
        setInterval(() => {
          this.procLoading = true
          this.getPairValues(e)
        }, 20000) // refresh every 20 seconds
      } else { // error
        this.errorCallbackMessage = e['message'] // display the error message
        this.exchangeList = super.getOfflineData()
        this.childUpdateTime.emit(this.exchangeList[0]['timestamp'])
        this.cdr.detectChanges()
      }
    }, (error) => {
      console.log('inerror')
      this.errorCallbackMessage = error.message
    }, () => {
      this.procLoading = false
    })
  }

  /**
   * Setting the first forex table values.
   */
  setFirsPairtValues(e) {
    console.log('setting first values: ', e)
    Object.entries(e.rates).forEach(rate => {
      const myObj = super.getRateValue(rate)
      this.exchangeList.push(myObj)
    })
    this.childUpdateTime.emit(this.exchangeList[0]['timestamp']) // emit the last update timestamp
    // this.procLoading = false
  }

  getPairValues(e) {
    console.log('new vals ', e)
    Object.entries(e.rates).forEach(rate => {
      this.exchangeList.forEach(exUnit => {
        if (exUnit.name === rate[0]) {
          const myObj = super.getRateValue(rate)
          exUnit = myObj
          return
        }
      })
    })
    this.childUpdateTime.emit(this.exchangeList[0]['timestamp']) // emit the last update timestamp
  }

}
