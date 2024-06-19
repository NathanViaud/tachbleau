import { describe, it, expect } from "vitest";
import mongoose from "mongoose";

describe("MongoDB", () => {
  it("should connect to MongoDB", async () => {
    const mongodburi = process.env.MONGODB_URI;

    if (!mongodburi) {
      throw new Error("MONGODB_URI is not defined");
    }
    const connection = await mongoose.connect(mongodburi);
    expect(connection).toBeDefined();
  });
});