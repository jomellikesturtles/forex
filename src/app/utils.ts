export class Utils {

  /**
   * Gets the flag's url.
   * @param code the currency code
   */
  getFlagUrl(code: String) {
    return `https://www.countryflags.io/${code.substr(0, 2)}/shiny/64.png`
  }

  /**
   * Gets the proper name of date time based on unix timestamp.
   * @param timestamp unix timestamp
   * @returns human readable time and date
   */
  getCurrentTimeAndDate(timestamp: number) {
    let myDate = new Date(timestamp * 1000)
    return myDate.toLocaleString()
  }
}
