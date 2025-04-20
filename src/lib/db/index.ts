import type { NeonQueryFunction } from '@neondatabase/serverless'
import { env } from '$env/dynamic/private'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

let client: NeonQueryFunction<false, false>

export function initDb() {
  client = neon(env.DATABASE_URL!)
}

export function getDb() {
  return drizzle(client)
}
