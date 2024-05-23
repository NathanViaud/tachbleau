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
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 0) return `In ${days} days`
    else if (days < 0) return `${Math.abs(days)} days ago`;
    else return 'Today';
}