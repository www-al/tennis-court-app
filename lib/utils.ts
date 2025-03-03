/**
 * Utility functions for the tennis court booking application
 */

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format a currency amount to a readable string
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Calculate the cost per player
 */
export function calculateCostPerPlayer(totalCost: number, playerCount: number): number {
  if (playerCount <= 0) {
    return totalCost;
  }
  
  return totalCost / playerCount;
}

/**
 * Calculate the duration in hours between two dates
 */
export function getDurationInHours(startTime: Date, endTime: Date): number {
  const diffMs = endTime.getTime() - startTime.getTime();
  return diffMs / (1000 * 60 * 60);
}

/**
 * Format a time range between two dates
 */
export function formatTimeRange(startTime: Date, endTime: Date): string {
  const startFormatted = startTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  const endFormatted = endTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  return `${startFormatted} - ${endFormatted}`;
} 