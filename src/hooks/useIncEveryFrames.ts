import { useCurrentFrame } from 'remotion'

import { VIDEO_FPS } from '@/types/constants'

const useIncEveryFrames = ({
 everyS,
 start = 0,
 onMatchCallback,
}: {
 everyS: number
 start?: number
 onMatchCallback?: (msgN: number) => void
}) => {
 const frame = useCurrentFrame()
 return Math.floor(frame / (VIDEO_FPS * everyS))
}

export default useIncEveryFrames
