import { useRef } from 'react'

import { useCurrentFrame } from 'remotion'

import { VIDEO_FPS } from '@/types/constants'

const useOscillate = ({ transitionS = 2 }: { transitionS?: number }) => {
 const frame = useCurrentFrame()
 let animStep = useRef(0)

 if (frame % (VIDEO_FPS * transitionS) === 0) animStep.current = animStep.current === 1 ? 0 : 1

 return animStep.current
}

export default useOscillate
