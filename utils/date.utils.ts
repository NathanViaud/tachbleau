import { type DateValue, parseDate } from '@internationalized/date';

export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function calendarToDate(date: DateValue): string {
    return date.toString();
}

export function dateToCalendar(date: string): DateValue {
    return parseDate(date);
}

/**
 * Get the number of days between the given date & today
 * @param date
 */
export function getRelativeDate(date: string): string {
    const today = new Date();
    const givenDate = new Date(date);
    const diff = givenDate.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    else if (days === 1) return 'Tomorrow';
    else if (days === -1) return 'Yesterday';
    else if (days > 1) return `In ${days} days`;
    else return `${Math.abs(days)} days ago`;
}

/**
 * Check if the given date is in the past
 * @param date
 * @remarks - This function ignores the time part of the date and return false if the given date is today
 */
export function isDateInPast(date: string): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const givenDate = new Date(date);
    givenDate.setHours(0, 0, 0, 0);
    
    return givenDate < today;
}