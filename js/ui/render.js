import { formatCurrency } from "../utils/helpers.js";

/**
 * Render transactions into table
 */
export function renderTransactions(transactions) {
  const tbody = document.getElementById("transactionList");
  tbody.innerHTML = "";

  transactions.forEach(txn => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${txn.date}</td>
      <td>${txn.type}</td>
      <td>${txn.category}</td>
      <td>${formatCurrency(txn.convertedAmount, txn.baseCurrency)}</td>
      <td>${txn.currency}</td>
    `;

    tbody.appendChild(row);
  });
}

/**
 * Update dashboard totals
 */
export function renderSummary(transactions) {
  let income = 0;
  let expenses = 0;

  transactions.forEach(txn => {
    txn.type === "income"
      ? (income += txn.convertedAmount)
      : (expenses += txn.convertedAmount);
  });

  document.getElementById("totalIncome").textContent =
    formatCurrency(income);

  document.getElementById("totalExpenses").textContent =
    formatCurrency(expenses);

  document.getElementById("balance").textContent =
    formatCurrency(income - expenses);
}

/**
 * Filter transactions by selected month
 */
export function filterByMonth(transactions, month) {
  if (!month) return transactions;

  return transactions.filter(txn =>
    txn.date.startsWith(month)
  );
}

