import { z } from 'zod'

export const CompositionProps = z.object({
 artworkImageUrls: z.array(z.string()),
 audioStartFrom: z.number().optional(),
 audioFileName: z.string().optional(),
 messages: z.array(z.string()),
})

export const RenderRequest = z.object({
 id: z.string(),
 inputProps: CompositionProps,
 withLogProgress: z.boolean().optional(),
 customData: z.record(z.any()).optional(),
})

export const ProgressRequest = z.object({
 bucketName: z.string(),
 id: z.string(),
})

export type CompositionPropsType = z.infer<typeof CompositionProps>

export type ProgressResponse =
 | {
    type: 'error'
    message: string
   }
 | {
    type: 'progress'
    progress: number
   }
 | {
    type: 'done'
    url: string
    size: number
   }
