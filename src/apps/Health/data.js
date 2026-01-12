// Mock health data for Windows Phone 8.1 Health & Fitness App

export const MOCK_HEALTH_GOALS = {
    dailySteps: 10000,
    dailyCalories: 2000,
    dailyDistance: 8000, // meters
};

export const MOCK_TODAY_DATA = {
    date: new Date(),
    steps: 7234,
    calories: 1456,
    distance: 5820, // meters
    activeMinutes: 45,
};

export const MOCK_WEEKLY_DATA = [
    { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), steps: 8234, calories: 1678, distance: 6580 },
    { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), steps: 6123, calories: 1234, distance: 4900 },
    { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), steps: 11456, calories: 2100, distance: 9165 },
    { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), steps: 9876, calories: 1890, distance: 7900 },
    { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), steps: 5432, calories: 1100, distance: 4345 },
    { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), steps: 10234, calories: 1950, distance: 8187 },
    { date: new Date(), steps: 7234, calories: 1456, distance: 5820 },
];

export const MOCK_MONTHLY_DATA = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
    steps: Math.floor(Math.random() * 8000) + 4000,
    calories: Math.floor(Math.random() * 1200) + 800,
    distance: Math.floor(Math.random() * 6400) + 3200,
}));

/**
 * Calculate progress percentage based on current value and goal
 * @param {number} current - Current value
 * @param {number} goal - Goal value
 * @returns {number} Progress percentage (0-100)
 */
export function calculateProgress(current, goal) {
    if (goal <= 0) return 0;
    const progress = (current / goal) * 100;
    return Math.min(Math.round(progress), 100);
}

/**
 * Format distance in meters to a readable string
 * @param {number} meters - Distance in meters
 * @returns {string} Formatted distance string
 */
export function formatDistance(meters) {
    if (meters >= 1000) {
        return `${(meters / 1000).toFixed(1)} km`;
    }
    return `${meters} m`;
}

/**
 * Format number with thousands separator
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(num) {
    return num.toLocaleString();
}

/**
 * Get day name abbreviation from date
 * @param {Date} date - Date object
 * @returns {string} Day abbreviation (Mon, Tue, etc.)
 */
export function getDayAbbreviation(date) {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
}

/**
 * Get formatted date string
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
