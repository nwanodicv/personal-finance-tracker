/**
 * Render a simple bar chart for expenses by category
 */
export function renderExpenseChart(transactions) {
  const canvas = document.getElementById("expenseChart");
  const ctx = canvas.getContext("2d");

  // Clear previous chart
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Aggregate expenses
  const categories = {};

  transactions
    .filter(txn => txn.type === "expense")
    .forEach(txn => {
      categories[txn.category] =
        (categories[txn.category] || 0) + txn.convertedAmount;
    });

  const keys = Object.keys(categories);
  if (keys.length === 0) return;

  const values = Object.values(categories);
  const max = Math.max(...values);

  const barWidth = canvas.width / keys.length - 20;

  keys.forEach((cat, i) => {
    const barHeight = (categories[cat] / max) * (canvas.height - 40);

    ctx.fillStyle = "#1abc9c";
    ctx.fillRect(
      i * (barWidth + 20) + 20,
      canvas.height - barHeight - 20,
      barWidth,
      barHeight
    );

    ctx.fillStyle = "#000";
    ctx.fillText(
      cat,
      i * (barWidth + 20) + 20,
      canvas.height - 5
    );
  });
}
