import { fetchPostJSON } from '@/utils/utils.common'
import { Client } from '@upstash/qstash'

const globalForQstash = global as unknown as { qstash: Client },
 configuration: ConstructorParameters<typeof Client>[0] = {
  token: process.env.QSTASH_API_TOKEN!,
 }

export const qstash = globalForQstash.qstash || new Client(configuration)

if (process.env.NODE_ENV !== 'production') {
 globalForQstash.qstash = qstash

 // use dev url from ngrok for local testing
 if (process.env.NODE_ENV === 'development') {
  globalForQstash.qstash.publishJSON = function publishJSON(req) {
   const [, ...url] = req.url?.split(process.env.PORT + '/') ?? [],
    injectedUrl = `${process.env.QSTASH_URL_DEV}/${url.join('/')}`

   return fetchPostJSON(injectedUrl, req?.body as any, false)
  }
 }
}
