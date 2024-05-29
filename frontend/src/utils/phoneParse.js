export function phoneParse(phone){
    /*
    * Function to parse a phone number to a readable format
    * 
    * @param {string} phone - Phone number to parse
    * @returns {string} - Parsed phone number
    */
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}