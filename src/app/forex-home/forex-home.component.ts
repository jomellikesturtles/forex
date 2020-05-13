import {
  Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';
import { Utils } from '../Utils'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-forex-home',
  templateUrl: './forex-home.component.html',
  styleUrls: ['./forex-home.component.scss']
})
export class ForexHomeComponent implements OnInit {

  viewMode = 'grid'
  lastUpdateTime = ''

  constructor() { }

  ngOnInit(): void { }

  /**
   * Updates the last update time
   * @param val
   */
  setLastUpdateTime(val) {
    const u = new Utils()
    this.lastUpdateTime = u.getCurrentTimeAndDate(val)
  }
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
