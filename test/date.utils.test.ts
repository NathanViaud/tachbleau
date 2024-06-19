import { describe, it, expect } from "vitest";
import { formatDate, calendarToDate, dateToCalendar, getRelativeDate, isDateInPast } from "../utils/date.utils";

describe("formatDate", () => {
  it("should format date correctly", () => {
    const formattedDate = formatDate("2022-01-01");
    expect(formattedDate).toBe("January 1, 2022");
  });
});

describe("getRelativeDate", () => {
  it("should return 'Today' for current date", () => {
    const relativeDate = getRelativeDate(new Date().toISOString());
    expect(relativeDate).toBe("Today");
  });

  it("should return 'Tomorrow' for tomorrow's date", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const relativeDate = getRelativeDate(tomorrow.toISOString());
    expect(relativeDate).toBe("Tomorrow");
  });

  it("should return 'Yesterday' for yesterday's date", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const relativeDate = getRelativeDate(yesterday.toISOString());
    expect(relativeDate).toBe("Yesterday");
  });

  it("should return 'In X days' for future date", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    const relativeDate = getRelativeDate(futureDate.toISOString());
    expect(relativeDate).toBe("In 5 days");
  });

  it("should return 'X days ago' for past date", () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 5);
    const relativeDate = getRelativeDate(pastDate.toISOString());
    expect(relativeDate).toBe("5 days ago");
  });
});

describe("isDateInPast", () => {
  it("should return true for past date", () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 5);
    const isInPast = isDateInPast(pastDate.toISOString());
    expect(isInPast).toBe(true);
  });

  it("should return false for today's date", () => {
    const today = new Date();
    const isInPast = isDateInPast(today.toISOString());
    expect(isInPast).toBe(false);
  });

  it("should return false for future date", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    const isInPast = isDateInPast(futureDate.toISOString());
    expect(isInPast).toBe(false);
  });
});