import { useRef } from 'react'

import { useCurrentFrame } from 'remotion'

import { VIDEO_FPS } from '@/types/constants'

const useRngEveryFrames = ({
 everyS,
 min = 0,
 max = 1,
 int = true,
}: {
 everyS: number
 min?: number
 max?: number
 int?: boolean
}) => {
 const frame = useCurrentFrame()
 const num = useRef(0)

 if (frame % (VIDEO_FPS * everyS) === 0) num.current = min + Math.random() * (max - min)

 return int ? Math.floor(num.current) : num.current
}

export default useRngEveryFrames
