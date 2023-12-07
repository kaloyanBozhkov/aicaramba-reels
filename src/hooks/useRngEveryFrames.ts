import { useRef } from 'react'

import { random, useCurrentFrame } from 'remotion'

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
  if (max === 0) return 0

  let rng = min + random(`rng-${frame}`) * (max - min)

  if (int) {
   let c = 50
   do {
    rng = Math.floor(min + random(`rng-${frame}`) * (max - min))
    c--
   } while (Math.floor(rng) === num.current && c > 0)

   num.current = Math.floor(rng)
  } else {
   num.current = rng
  }
  onMatchCallback?.(num.current)
 }

 return num.current
}

export default useRngEveryFrames
