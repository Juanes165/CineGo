export function priceParse(price){
    /*
    * Function to parse a price string to a number
    * with no zeros and dots every three digits
    * 
    * @param {string} price - Price string to parse
    * @returns {string} - Parsed price
    */
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}