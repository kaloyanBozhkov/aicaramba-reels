import { useRef } from 'react'

import { useCurrentFrame } from 'remotion'

import { VIDEO_FPS } from '@/types/constants'

const useRngEveryFrames = ({
 everyS,
 min = 0,
 max = 1,
 int = true,
 onMatchCallback,
}: {
 everyS: number
 min?: number
 max?: number
 int?: boolean
 onMatchCallback?: (msgN: number) => void
}) => {
 const frame = useCurrentFrame()
 const num = useRef(0)

 if (frame % (VIDEO_FPS * everyS) === 0) {
  num.current = min + Math.random() * (max - min)
  onMatchCallback?.(num.current)
 }

 return int ? Math.floor(num.current) : num.current
}

export default useRngEveryFrames
