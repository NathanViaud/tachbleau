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

export function dateToCalendar(date: string): DateValue{
    return parseDate(date);
}