import { env } from '$env/dynamic/private'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

let client: postgres.Sql

export function initDb() {
  // @ts-ignore
  client = postgres(env.OPUS_CLASSICAL_HYPERDRIVE?.connectionString)
}

export function getDb() {
  return drizzle(client)
}
