import fetchPonyfill from 'fetch-ponyfill'

export const getBaseUrl = (useRelativeOnFE = true) => {
 if (typeof window !== 'undefined' && useRelativeOnFE)
  // browser should use relative path
  return ''

 if (process.env.NEXT_PUBLIC_DOMAIN && process.env.NODE_ENV !== 'development')
  return process.env.NEXT_PUBLIC_DOMAIN.includes('http')
   ? process.env.NEXT_PUBLIC_DOMAIN
   : `https://${process.env.NEXT_PUBLIC_DOMAIN}`

 // assume localhost
 return `http://localhost:${process.env.PORT ?? 3001}`
}

export async function fetchPostJSON<T>(url: string, data?: {}, usePonyfill = true): Promise<T> {
 try {
  // Default options are marked with *
  const response = await (usePonyfill ? fetchPonyfill() : { fetch }).fetch(url, {
   method: 'POST', // *GET, POST, PUT, DELETE, etc.
   mode: 'cors', // no-cors, *cors, same-origin
   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
   credentials: 'same-origin', // include, *same-origin, omit
   headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
   },
   redirect: 'follow', // manual, *follow, error
   referrerPolicy: 'no-referrer', // no-referrer, *client
   body: data ? JSON.stringify(data) : undefined,
  })

  if (!response.ok) {
   const txt = await response.text()
   console.warn(txt)
   throw new Error(txt || 'Failed to fetch data')
  }

  const resp = await response.json()
  return resp
 } catch (err) {
  console.error('fetchPostJSON:', err)
  if (err instanceof Error) throw new Error(err.message)
  throw err
 }
}

export async function fetchDeleteJSON<T>(url: string, usePonyfill = true): Promise<T | Error> {
 try {
  // Default options are marked with *
  const response = await (usePonyfill ? fetchPonyfill() : { fetch }).fetch(url, {
   method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
   mode: 'cors', // no-cors, *cors, same-origin
   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
   credentials: 'same-origin', // include, *same-origin, omit
   headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
   },
   redirect: 'follow', // manual, *follow, error
   referrerPolicy: 'no-referrer', // no-referrer, *client
  })

  if (!response.ok) throw Error('Failed to fetch data')

  return await response.json() // parses JSON response into native JavaScript objects
 } catch (err) {
  if (err instanceof Error) throw new Error(err.message)
  throw err
 }
}

export const encodeGetParams = (p: Record<string, string>) =>
 Object.entries(p)
  .map((kv) => kv.map(encodeURIComponent).join('='))
  .join('&')

export async function fetchGetJSON<T>(url: string, usePonyfill = true): Promise<T> {
 try {
  const data = await (usePonyfill ? fetchPonyfill() : { fetch })
   .fetch(url)
   .then((res) => res.json())
  if (data.statusCode === 500 && data.message) throw Error(data.message)
  return data
 } catch (err) {
  if (err instanceof Error) throw new Error(err.message)
  throw err
 }
}
