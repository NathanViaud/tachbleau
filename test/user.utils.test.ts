import { describe, it, expect } from "vitest";
import { nameToColor } from "../utils/users.utils";

describe("nameToColor", () => {
  it("should return a valid HSL color string", () => {
    const color = nameToColor("John Doe");
    const colorRegex = "hsl(-147, 90%, 75%)";

    expect(color).toMatch(colorRegex);
  });

  it("should return the same color for the same name", () => {
    const color1 = nameToColor("John Doe");
    const color2 = nameToColor("John Doe");

    expect(color1).toBe(color2);
  });

  it("should return different colors for different names", () => {
    const color1 = nameToColor("John Doe");
    const color2 = nameToColor("Jane Smith");

    expect(color1).not.toBe(color2);
  });
});