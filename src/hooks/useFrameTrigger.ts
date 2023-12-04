import { useLayoutEffect } from 'react'

import { useCurrentFrame } from 'remotion'

const useFrameTrigger = ({ atFrame, callback }: { atFrame: number; callback: () => void }) => {
 const frame = useCurrentFrame()

 useLayoutEffect(() => {
  if (frame === atFrame) callback()
 }, [frame, atFrame, callback])
}

export default useFrameTrigger
