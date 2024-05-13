import crypto from "crypto";

// Generate a random string for TOKEN_SECRET
const TOKEN_SECRET = crypto.randomBytes(64).toString("hex");

// Set a specific time for TOKEN_EXPIRES (e.g., 1 hour)
const TOKEN_EXPIRES = "1h";

// Choose a name for TOKEN_NAME
const TOKEN_NAME = "my_token";

console.log(`TOKEN_SECRET=${TOKEN_SECRET}`);
console.log(`TOKEN_EXPIRES=${TOKEN_EXPIRES}`);
console.log(`TOKEN_NAME=${TOKEN_NAME}`);
