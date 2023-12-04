import { type ReactNode } from 'react'

import { Sequence } from 'remotion'

import useMultipleFrameAnim from '@/hooks/useMultipleFrameAnim'
import { VIDEO_FPS } from '@/types/constants'

const Slider = ({
 children,
 durationInFrames,
 transitionDurationS = 1.3,
 direction = 'left',
}: {
 children: ReactNode[]
 durationInFrames: number
 transitionDurationS?: number
 direction?: 'left' | 'right'
}) => {
 const transitionInFrames = transitionDurationS * VIDEO_FPS,
  slideDurationFrames = durationInFrames / children.length,
  transitionsIn = useMultipleFrameAnim({
   checkpoints: children.map((c, idx) => ({
    startAt: idx * slideDurationFrames,
    duration: transitionInFrames,
    key: `child-${idx}`,
   })),
  }),
  transitionsOut = useMultipleFrameAnim({
   checkpoints: children.map((c, idx) => ({
    startAt: idx * slideDurationFrames,
    duration: transitionInFrames,
    delay: slideDurationFrames,
    key: `child-${idx}`,
   })),
  })

 return (
  <Sequence durationInFrames={durationInFrames}>
   <div className="relative w-full">
    {children.map((c, idx) => {
     const tIn = transitionsIn[`child-${idx}`],
      tOut = transitionsOut[`child-${idx}`],
      dir = direction === 'left' ? 1 : -1

     let startingSide = 'left-full'

     if (direction === 'right') {
      startingSide = 'right-full'
     }

     let translate = (-100 * tIn + tOut * -100) * dir

     return (
      <div
       key={idx}
       className={`w-fit absolute ${startingSide} min-h-fit min-w-[100%]`}
       style={{
        transform: `translateX(${translate}%)`,
       }}
      >
       {c}
      </div>
     )
    })}
   </div>
  </Sequence>
 )
}

export default Slider
