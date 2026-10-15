/**
 * Format a number as an Indian Rupee (INR) currency string.
 * e.g. 1299 -> "₹1,299"
 */
export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
