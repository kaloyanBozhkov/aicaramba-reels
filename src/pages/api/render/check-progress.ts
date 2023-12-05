import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

import { asyncWait, fetchPostJSON, getBaseUrl } from '@/utils/utils.common'

const InstagramPostSchema = z.object({
 secret: z.string().uuid(),
 renderId: z.string(),
 bucketName: z.string(),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 try {
  const { secret, renderId, bucketName } = InstagramPostSchema.parse(req.body)

  if (!secret || secret !== process.env.SENSITIVE_CRUD_SECRET) throw Error('Not allowed')

  await asyncWait(3)

  const resp = await fetchPostJSON<{
   data: { type: 'done' | 'progress' | 'error'; url?: string; progress?: number; message?: string }
  }>(`${getBaseUrl(false)}/api/lambda/progress`, {
   bucketName: bucketName,
   id: renderId,
  })

  if (resp?.data?.type === 'done') {
   console.log('Finished url', resp.data.url)
   res.status(200).json({ status: 'ready', url: resp.data.url })
  } else if (resp.data.type === 'progress') {
   console.log('Progress:', resp.data.progress)
   res.status(200).json({ status: 'in-progress', progress: resp.data.progress })
   await fetchPostJSON(`${getBaseUrl(false)}/api/render/check-progress`, {
    secret,
    renderId,
    bucketName,
   })
  } else {
   console.error(resp.data)
   throw Error('Failed to process video')
  }
 } catch (error: any) {
  if (error instanceof z.ZodError) {
   res.status(400).json({ error: error.errors })
  } else {
   res.status(500).json({ error: error?.message })
  }
 }
}
