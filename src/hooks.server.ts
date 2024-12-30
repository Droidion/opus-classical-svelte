import type { Handle } from '@sveltejs/kit'
import { initDb } from '$lib/db'
import { sequence } from '@sveltejs/kit/hooks'

const handleDb: Handle = async ({ event, resolve }) => {
  initDb()
  return resolve(event)
}

const securityHeaders: Handle = async ({ event, resolve }) => {
  const response = await resolve(event)

  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()',
  )
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload',
  )

  return response
}

export const handle = sequence(handleDb, securityHeaders)
