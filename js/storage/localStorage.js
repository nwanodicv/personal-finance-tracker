const STORAGE_KEY = "finance_transactions";

/**
 * Fetch all stored transactions
 * @returns {Array}
 */
export function getTransactions() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Save all transactions to localStorage
 * @param {Array} transactions
 */
export function saveTransactions(transactions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

/**
 * Add a single transaction
 * @param {Object} transaction
 */
export function addTransaction(transaction) {
  const transactions = getTransactions();
  transactions.push(transaction);
  saveTransactions(transactions);
}

/**
 * Clear all transactions (for testing / reset)
 */
export function clearTransactions() {
  localStorage.removeItem(STORAGE_KEY);
}
