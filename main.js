const apiKey = import.meta.env.VITE_CURRENCY_API_KEY;

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

let rates = {};

async function loadCurrencies() {
    try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
        const data = await res.json();

        if (data.result !== "success") {
            throw new Error("API Error");
        }

        rates = data.conversion_rates;

        Object.keys(rates).forEach(currency => {
            const option1 = document.createElement("option");
            const option2 = document.createElement("option");

            option1.value = option2.value = currency;
            option1.textContent = option2.textContent = currency;

            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });

        fromCurrency.value = "USD";
        toCurrency.value = "EUR";

    } catch (err) {
        console.error("Failed to load currencies:", err);
    }
}

function convert() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amt = Number(amount.value);

    if (!amt) {
        result.textContent = "Enter amount";
        return;
    }

    const usdValue = amt / rates[from];
    const converted = usdValue * rates[to];

    result.textContent = converted.toFixed(2);
}

convertBtn.addEventListener("click", convert);

loadCurrencies();