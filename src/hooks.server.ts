import type { Handle } from '@sveltejs/kit'
import { env } from '$env/dynamic/public'
import { initDb } from '$lib/db'
import { sequence } from '@sveltejs/kit/hooks'

const handleDb: Handle = async ({ event, resolve }) => {
  initDb()
  return resolve(event)
}

const securityHeaders: Handle = async ({ event, resolve }) => {
  const response = await resolve(event)

  const csp = response.headers.get('Content-Security-Policy')
  response.headers.set(
    'Content-Security-Policy',
    csp?.replaceAll('PUBLIC_IMAGES_URL', env.PUBLIC_IMAGES_URL) || '',
  )

  response.headers.set('Referrer-Policy', 'no-referrer')
  response.headers.set(
    'Permissions-Policy',
    'accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()',
  )
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload',
  )

  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin')

  return response
}

export const handle = sequence(handleDb, securityHeaders)
