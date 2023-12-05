import { DISK, RAM, REGION, SITE_NAME, TIMEOUT } from '@/../config.mjs'
import { executeApi } from '@/helpers/api-response'
import { CompositionPropsType, RenderRequest } from '@/lambda/schema'
import { fetchPostJSON, getBaseUrl } from '@/utils/utils.common'
import {
 AwsRegion,
 RenderMediaOnLambdaInput,
 RenderMediaOnLambdaOutput,
} from '@remotion/lambda/client'
import { renderMediaOnLambda, speculateFunctionName } from '@remotion/lambda/client'

const render = executeApi<RenderMediaOnLambdaOutput, typeof RenderRequest>(
 RenderRequest,
 async (req, body) => {
  if (req.method !== 'POST') {
   throw new Error('Only POST requests are allowed')
  }

  if (!process.env.AWS_ACCESS_KEY_ID && !process.env.REMOTION_AWS_ACCESS_KEY_ID) {
   throw new TypeError(
    'Set up Remotion Lambda to render videos. See the README.md for how to do so.'
   )
  }
  if (!process.env.AWS_SECRET_ACCESS_KEY && !process.env.REMOTION_AWS_SECRET_ACCESS_KEY) {
   throw new TypeError(
    'The environment variable REMOTION_AWS_SECRET_ACCESS_KEY is missing. Add it to your .env file.'
   )
  }

  const webhook: RenderMediaOnLambdaInput['webhook'] = {
   url: process.env.AICARAMBA_WEBHOOK_ENDPOINT ?? 'AICARAMBA_WEBHOOK_ENDPOINT UNSET',
   secret: process.env.WEBHOOK_SECRET as string,
  }

  const result = await renderMediaOnLambda({
   deleteAfter: '3-days',
   codec: 'h264',
   functionName: speculateFunctionName({
    diskSizeInMb: DISK,
    memorySizeInMb: RAM,
    timeoutInSeconds: TIMEOUT,
   }),
   region: REGION as AwsRegion,
   serveUrl: SITE_NAME,
   composition: body.id!,
   inputProps: body.inputProps as CompositionPropsType,
   framesPerLambda: 10,
   downloadBehavior: {
    type: 'download',
    fileName: 'aicaramba-reel.mp4',
   },
   webhook,
  })

  console.log('result', result)

  if (req.body.withLogProgress) {
   console.log('About to hit', `${getBaseUrl(false)}/api/render/check-progress`)
   await fetchPostJSON(`${getBaseUrl(false)}/api/render/check-progress`, {
    renderId: result.renderId,
    bucketName: result.bucketName,
    secret: process.env.SENSITIVE_CRUD_SECRET!,
   })
  }

  return result
 }
)

export default render
