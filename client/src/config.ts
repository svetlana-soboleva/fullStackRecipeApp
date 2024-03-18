export const apiOrigin = import.meta.env.VITE_API_ORIGIN as string
export const apiPath = import.meta.env.VITE_API_PATH as string
export const apiBase = `${apiOrigin}${apiPath}`
export const sentryDSN = import.meta.env.VITE_SENTRY_DSN as string

if (typeof apiOrigin !== 'string') {
  throw new Error('VITE_API_ORIGIN is not defined')
}

if (typeof apiPath !== 'string') {
  throw new Error('VITE_API_PATH is not defined')
}
