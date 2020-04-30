export class Utils {


  /**
   * Gets the flag's url.
   * @param code the currency code
   */
  getFlagUrl(code) {
    return `https://www.countryflags.io/${code.substr(0, 2)}/shiny/64.png`
  }


  getCurrentTimeAndDate(timestamp: number) {
    let myDate = new Date(timestamp * 1000)
    return myDate.toLocaleString()
  }
}
