const API_URL = "https://open.er-api.com/v6/latest";

async function getCurrencies() {
  const response = await fetch(`${API_URL}/USD`);
  const data = await response.json();
  return Object.keys(data.rates);
}

async function getRate(fromCurrency, toCurrency) {
  const response = await fetch(`${API_URL}/${fromCurrency}`);
  const data = await response.json();
  return data.rates[toCurrency];
}

export { getCurrencies, getRate };
