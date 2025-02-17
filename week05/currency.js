const convertBtn = document.getElementById('convertBtn');
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const resultDisplay = document.getElementById('result');
const convertedAmount = document.getElementById('convertedAmount');

// Replace with your actual API key
const apiKey = '4742315eddba4052809807b14fd15d0b'; // Replace with your actual API key from ExchangeRatesAPI.io
const apiUrl = `https://api.exchangeratesapi.io/latest?base=USD&access_key=4742315eddba4052809807b14fd15d0b`;

async function fetchExchangeRate() {
    const from = fromCurrency.value;
    const to = toCurrency.value;

    try {
        const response = await fetch(`${apiUrl}&symbols=${to}`);
        const data = await response.json();
        
        if (data.success) {
            const rate = data.rates[to];
            return rate;
        } else {
            throw new Error('Failed to fetch exchange rate');
        }
    } catch (error) {
        console.error(error);
        alert('Failed to fetch exchange rate. Please try again later.');
    }
}

async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount to convert');
        return;
    }

    const rate = await fetchExchangeRate();

    if (rate) {
        const converted = (amount * rate).toFixed(2);
        convertedAmount.textContent = `${converted} ${toCurrency.value}`;
        resultDisplay.style.display = 'block'; // Show the result
    }
}

convertBtn.addEventListener('click', convertCurrency);

