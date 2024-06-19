import { defineConfig } from 'vitest/config'
import { config } from 'dotenv'
config()

export default defineConfig({
  test: {
    env: {
        MONGODB_URI: process.env.MONGODB_URI ?? ''
        }
  }
})