import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

import { messages } from '@/types/constants'
import { getRandomSubset } from '@/utils/helpers'
import { fetchPostJSON, getBaseUrl } from '@/utils/utils.common'
import { RenderMediaOnLambdaOutput } from '@remotion/lambda'

const PayloadSchema = z.object({
 secret: z.string().uuid(),
 productIds: z.array(z.string().uuid()),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 try {
  const { secret, productIds } = PayloadSchema.parse(req.body)

  if (!secret || secret !== process.env.SENSITIVE_CRUD_SECRET) throw Error('Not allowed')

  const artworkImageUrls = productIds.map(
   (id) => `https://aicaramba.s3.eu-central-1.amazonaws.com/reels/${id}`
  )

  const resp = await fetchPostJSON<RenderMediaOnLambdaOutput>(
   `${getBaseUrl(false)}/api/lambda/render`,
   {
    id: 'Main',
    inputProps: {
     artworkImageUrls,
     messages: getRandomSubset(messages, 5),
    },
    withLogProgress: true,
    customData: {
     productIds,
    },
   }
  )

  res.status(200).json(resp)
 } catch (error: any) {
  if (error instanceof z.ZodError) {
   res.status(400).json({ error: error.errors })
  } else {
   res.status(500).json({ error: error?.message })
  }
 }
}
