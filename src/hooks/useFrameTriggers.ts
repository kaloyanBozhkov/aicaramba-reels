import { useLayoutEffect } from 'react'

import { useCurrentFrame } from 'remotion'

const useFrameTriggers = ({ atFrames, callback }: { atFrames: number[]; callback: () => void }) => {
 const frame = useCurrentFrame()

 useLayoutEffect(() => {
  if (atFrames.includes(frame)) callback()
 }, [frame, atFrames, callback])
}

export default useFrameTriggers
