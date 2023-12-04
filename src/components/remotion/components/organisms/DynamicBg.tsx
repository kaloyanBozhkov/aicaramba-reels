import { AbsoluteFill, useCurrentFrame } from 'remotion'

import useMultipleFrameAnim from '@/hooks/useMultipleFrameAnim'
import { DURATION_IN_FRAMES, VIDEO_FPS } from '@/types/constants'

import Bg from '../atoms/Bg'

const DynamicBg = ({
 ps,
 transitionDurationS = 1.3,
}: {
 ps: string[]
 transitionDurationS: number
}) => {
 const frames = useCurrentFrame()
 // same as shirt sldie
 const bgDuration = DURATION_IN_FRAMES / ps.length
 const bg = Math.floor(frames / bgDuration)
 const animate = useMultipleFrameAnim({
  checkpoints: ps.map((_, idx) => ({
   startAt: idx * bgDuration,
   duration: transitionDurationS * VIDEO_FPS,
   key: `a-${idx}`,
  })),
 })

 return (
  <AbsoluteFill>
   <div className="-z-10 relative w-full h-full">
    <Bg
     style={{
      transform: `translateX(${(1 - animate[`a-${bg}`]) * (bg > 0 ? 150 : 35)}%)`,
      zIndex: '0',
     }}
     src={ps[bg]}
    />
    {bg > 0 && <Bg src={ps[bg - 1]} style={{ zIndex: '-1' }} />}
   </div>
  </AbsoluteFill>
 )
}

export default DynamicBg
