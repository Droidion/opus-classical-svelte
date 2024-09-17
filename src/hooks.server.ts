import type { Handle } from '@sveltejs/kit'
import { dev } from '$app/environment'
import { env } from '$env/dynamic/public'
import { handleErrorWithSentry, sentryHandle } from '@sentry/sveltekit'
import * as Sentry from '@sentry/sveltekit'
import { sequence } from '@sveltejs/kit/hooks'

if (!dev) {
  Sentry.init({
    dsn: env.PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0,

    // uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: import.meta.env.DEV,
  })
}

const securityHeaders: Handle = async ({ event, resolve }) => {
  const response = await resolve(event)

  response.headers.set(
    'Content-Security-Policy',
    'default-src \'self\'; '
    + 'script-src \'self\' \'unsafe-inline\'; '
    + 'style-src \'self\' \'unsafe-inline\'; '
    + 'img-src \'self\' data: https:; '
    + 'font-src \'self\'; '
    + 'connect-src \'self\' https:; '
    + 'frame-ancestors \'none\'; '
    + 'form-action \'self\'; '
    + 'base-uri \'self\'; '
    + 'upgrade-insecure-requests;',
  )

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

// If you have custom handlers, make sure to place them after `sentryHandle()` in the `sequence` function.
export const handle = sequence(sentryHandle(), securityHeaders)

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry()
