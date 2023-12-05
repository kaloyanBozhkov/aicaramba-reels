import { NextRequest, NextResponse } from 'next/server'
import type { NextFetchEvent } from 'next/server'
import { z } from 'zod'

import { asyncWait, fetchPostJSON, getBaseUrl } from '@/utils/utils.common'

const CheckProgressSchema = z.object({
 secret: z.string().uuid(),
 renderId: z.string(),
 bucketName: z.string(),
 retryCount: z.number().optional(),
})

export const config = {
 runtime: 'edge',
}

type CheckProgressPayload = (typeof CheckProgressSchema)['_output']

export default async function checkProgressServerless(req: NextRequest, event: NextFetchEvent) {
 const oops = () =>
  NextResponse.json(
   { error: 'Something went wrong' },
   {
    status: 500,
    headers: {
     'Content-Type': 'application/json',
    },
   }
  )

 if (req.method !== 'POST' || !req.body) return oops()

 try {
  const input = await req.body.getReader().read(),
   decoder = new TextDecoder(),
   string = decoder.decode(input.value),
   data = JSON.parse(string) as CheckProgressPayload,
   { secret, renderId, bucketName, retryCount = 1 } = CheckProgressSchema.parse(data)

  if (!secret || secret !== process.env.SENSITIVE_CRUD_SECRET) return oops()

  event.waitUntil(
   (async () => {
    try {
     console.log('starting')
     await asyncWait(3)
     console.log('3s ran')

     const resp = await fetchPostJSON<{
      data: {
       type: 'done' | 'progress' | 'error'
       url?: string
       progress?: number
       message?: string
      }
     }>(
      `${getBaseUrl(false)}/api/lambda/progress`,
      {
       bucketName: bucketName,
       id: renderId,
      },
      false
     )

     if (resp?.data?.type === 'done') {
      console.log('Finished url', resp.data.url)
     } else if (resp.data.type === 'progress') {
      if (retryCount > 60 * 60) throw Error('Processing is taking too long!')
      console.log('Progress:', resp.data.progress)
      await fetchPostJSON(
       `${getBaseUrl(false)}/api/render/check-progress`,
       {
        secret,
        renderId,
        bucketName,
        retryCount: retryCount + 1,
       },
       false
      )
     } else {
      console.error(resp.data)
      throw Error('Failed to process video')
     }
    } catch (err) {
     console.error('check-progress serverless operation failed', err)
    }
   })()
  )

  return NextResponse.json(
   {
    status: 'started',
   },
   {
    status: 200,
    headers: {
     'Content-Type': 'application/json',
    },
   }
  )
 } catch (err) {
  console.error('check-progress serverless', err)
  oops()
 }
}
