import { renderExpenseChart } from "./ui/chart.js";
import { addTransaction, getTransactions } from "./storage/localStorage.js";
import { generateId, getToday } from "./utils/helpers.js";
import { renderTransactions, renderSummary } from "./ui/render.js";
import { getExchangeRate } from "./api/exchangeRate.js";
import { filterByMonth } from "./ui/render.js";




const formSection = document.getElementById("transactionForm");
const addBtn = document.getElementById("addTransactionBtn");
const cancelBtn = document.getElementById("cancelBtn");
const form = document.getElementById("financeForm");
const monthSelect = document.getElementById("monthSelect");


// Show form
addBtn.addEventListener("click", () => {
  formSection.hidden = false;
  document.getElementById("date").value = getToday();
});

// Hide form
cancelBtn.addEventListener("click", () => {
  formSection.hidden = true;
  form.reset();
});

// Submit form
form.addEventListener("submit", async e => {
  e.preventDefault();

  const amount = Number(document.getElementById("amount").value);
  const currency = document.getElementById("currency").value;
  const baseCurrency = "NGN";

  let rate = 1;

  try {
    rate = await getExchangeRate(currency, baseCurrency);
  } catch (error) {
  console.error("Exchange rate error FULL:", error);
  alert("Currency API error — check console");
}

  const convertedAmount = amount * rate;

  const transaction = {
    id: generateId(),
    type: document.getElementById("type").value,
    amount,
    currency,
    category: document.getElementById("category").value,
    date: document.getElementById("date").value,
    description: document.getElementById("description").value,
    baseCurrency,
    convertedAmount
  };

  addTransaction(transaction);
  updateUI();

  form.reset();
  formSection.hidden = true;
});

// Month filter
monthSelect.addEventListener("change", updateUI);

// Initial render
function updateUI() {
  const allTransactions = getTransactions();
  const filtered = filterByMonth(
    allTransactions,
    monthSelect.value
  );

  renderTransactions(filtered);
  renderSummary(filtered);
  renderExpenseChart(filtered);
}

//function updateUI() {
//  const transactions = getTransactions();
//  renderTransactions(transactions);
//  renderSummary(transactions);
//  renderExpenseChart(transactions);
//}

updateUI();
