import { env } from '$env/dynamic/private'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const client = postgres(env.OPUS_CLASSICAL_HYPERDRIVE?.connectionString)
export const db = drizzle(client)
