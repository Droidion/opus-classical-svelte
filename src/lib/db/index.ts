import { env } from '$env/dynamic/private'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

let client: postgres.Sql

export function initDb() {
  client = postgres(env.DATABASE_URL)
}

export function getDb() {
  return drizzle(client)
}
