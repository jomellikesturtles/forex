
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
