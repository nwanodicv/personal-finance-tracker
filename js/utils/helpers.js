/**
 * Generate a unique transaction ID
 */
export function generateId() {
  return `txn_${Date.now()}`;
}

/**
 * Format currency display
 */
export function formatCurrency(amount, currency = "NGN") {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency
  }).format(amount);
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getToday() {
  return new Date().toISOString().split("T")[0];
}
