import { ReactNode } from 'react'

import { useCurrentFrame } from 'remotion'

import useFrameAnim from '@/hooks/useFrameAnim'

const TripleText = ({
 text,
 className,
 title,
 titleClassName,
 delay = 0,
 speedFrames = 10,
}: {
 text: string
 className: string
 title?: ReactNode
 titleClassName?: string
 delay?: number
 speedFrames?: number
}) => {
 const secondPhaseAt = (delay + speedFrames) * 3
 const thirdPhaseAt = (delay + speedFrames) * 4
 const fourthPhaseAt = (delay + speedFrames) * 5
 const frame = useCurrentFrame()
 const t2 = useFrameAnim({ maxAtFrame: speedFrames, delayUntilFrame: delay })
 const t3 = useFrameAnim({ maxAtFrame: speedFrames, delayUntilFrame: speedFrames })
 const t4 = useFrameAnim({ maxAtFrame: speedFrames, delayUntilFrame: secondPhaseAt })
 const t5 = useFrameAnim({ maxAtFrame: speedFrames, delayUntilFrame: thirdPhaseAt })
 const t6 = useFrameAnim({ maxAtFrame: speedFrames, delayUntilFrame: fourthPhaseAt })
 const secondPhaseStarted = frame >= secondPhaseAt
 const thirdPhaseStarted = frame >= thirdPhaseAt

 let mainTextStyle = {
  transform: `translateY(0%)`,
 }

 if (secondPhaseStarted) {
  mainTextStyle = {
   transform: `translateY(${t4 * 100}%)`,
  }
 }
 if (thirdPhaseStarted) {
  mainTextStyle = {
   transform: `translateY(${t5 * 100 + 100}%)`,
  }
 }

 return (
  <div className={`${className}`}>
   {title && (
    <div
     className={`${titleClassName} font-semibold tracking-tighter relative`}
     style={{ marginBottom: `-${(1 - t6) * 48}px`, bottom: `${(1 - t6) * 100}%` }}
    >
     {title}
    </div>
   )}
   <h1 className="font-semibold tracking-tighter" style={mainTextStyle}>
    {text}
   </h1>
   <h1
    className="font-normal tracking-[-.04em]"
    style={
     secondPhaseStarted
      ? {
         opacity: 1 - t4,
        }
      : {
         transform: `translateY(${(1 - t2) * -100}%)`,
         opacity: t2,
        }
    }
   >
    {text}
   </h1>
   <h1
    className="font-light tracking-[-.02em]"
    style={
     thirdPhaseStarted
      ? {
         opacity: 1 - t5,
        }
      : {
         transform: `translateY(${(1 - t3) * -100}%)`,
         opacity: t3,
        }
    }
   >
    {text}
   </h1>
  </div>
 )
}

export default TripleText
