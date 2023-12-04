import { useRef } from 'react'

import { useCurrentFrame } from 'remotion'

import { VIDEO_FPS } from '@/types/constants'

const useTriggerFrames = ({
 durationS,
 dep,
 bounce = true,
}: {
 durationS: number
 dep: number | string
 bounce: boolean
}) => {
 const frame = useCurrentFrame()
 const lastDep = useRef<string | number | undefined>()
 const curr = useRef(0)
 const skipFrames = useRef(0)
 const dir = useRef('up')

 if (lastDep.current !== dep) {
  curr.current = 0
  skipFrames.current = frame
  lastDep.current = dep

  if (bounce) dir.current = dir.current === 'up' ? 'down' : 'up'
 }

 const delta = 1 / (durationS * VIDEO_FPS),
  diff = delta * (frame - skipFrames.current)

 if (dir.current === 'up') {
  curr.current += diff
  curr.current = Math.min(1, curr.current)
  return curr.current
 } else {
  curr.current -= diff
  curr.current = Math.max(0, curr.current)
  return 1 - diff
 }
}

export default useTriggerFrames
