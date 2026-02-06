const BASE_URL = "https://api.exchangerate.host/convert";

/**
 * Fetch exchange rate and convert amount
 */
export async function getExchangeRate(from, to) {
  if (from === to) return 1;

  const response = await fetch(
    `${BASE_URL}?from=${from}&to=${to}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch exchange rate");
  }

  const data = await response.json();

  if (!data.result) {
    throw new Error("Invalid exchange data");
  }

  return data.result;
}


//const BASE_URL = "https://api.exchangerate.host/latest";
//
///**
// * Fetch exchange rate from one currency to another
// * @param {string} from
// * @param {string} to
// * @returns {number}
// */
//export async function getExchangeRate(from, to) {
//  if (from === to) return 1;
//
//  const response = await fetch(
//    `${BASE_URL}?base=${from}&symbols=${to}`
//  );
//
//  const data = await response.json();
//  return data.rates[to];
//}
//