// Luhn Algorithm
export function validateLuhnAlgorithm(cardNumber) {
    /*
    * The Luhn algorithm is a simple checksum formula used to validate a variety of identification numbers, such as credit card numbers and Canadian Social Insurance Numbers.
    * The formula verifies a number against its included check digit, which is usually appended to a partial number to generate the full number.
    * This snippet receives a card number and returns a boolean value indicating whether the card number is valid or not.
    * 
    * @param {string} cardNumber
    * @returns {boolean}
    */
    let sum = 0;
    let isEven = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        isEven = !isEven;
    }
    detectCardType(cardNumber);
    return sum % 10 === 0;
}


// Card Type Detection
export function detectCardType(cardNumber) {
    /*
    * This snippet receives a card number and returns the card type.
    *
    * @param {string} cardNumber
    * @returns {string}
    */
    const patterns = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
    };

    for (const cardType in patterns) {
        if (patterns[cardType].test(cardNumber)) {
            return cardType;
        }
    }

    return "Unknown";
}


// Expiration Date Validation
export function validateExpirationDate(expirationMonth, expirationYear) {
    /*
    * This snippet receives an expiration month and year and returns a boolean value indicating whether the expiration date is valid or not.
    *
    * @param {number} expirationMonth
    * @param {number} expirationYear
    * @returns {boolean}
    */
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // January is 0

    console.log(expirationYear, currentYear)
    if (expirationYear > currentYear) {
        return true;
    } else if (expirationYear === currentYear && expirationMonth >= currentMonth) {
        return true;
    }

    return false;
}


// CVV/CVC Validation
export function validateCVV(cvv) {
    /*
    * This snippet receives a CVV and returns a boolean value indicating whether the CVV is valid or not.
    *
    * @param {string} cvv
    * @returns {boolean}
    */
    const cvvPattern = /^[0-9]{3,4}$/;
    return cvvPattern.test(cvv);
}