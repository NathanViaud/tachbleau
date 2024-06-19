import { describe, it, expect } from "vitest";

const randomEmail = () => {
  return Math.random().toString(36).substring(2, 15) + "@mail.com";
};
describe("User Login", () => {
  it("should login a user", async () => {
    const user = {
      email: "oussama@mail.com",
        password: "oussama",
    };
    const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        });
    const data = await response.json();
    console.log(data);
    expect(data).toBeDefined();
    });
});

describe("User Register", () => {
    it("should register a user", async () => {
        const user = {
        email: randomEmail(),
        password: "testtest",
        name: "test",
        job: "test",
        role: "user",
        };
        const response = await fetch("http://localhost:3000/api/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        console.log(data);
        expect(data).toBeDefined();

    }
    );
});