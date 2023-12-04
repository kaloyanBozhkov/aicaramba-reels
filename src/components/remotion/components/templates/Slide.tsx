import { ReactNode } from 'react'

import useMultipleFrameAnim from '@/hooks/useMultipleFrameAnim'
import { VIDEO_FPS } from '@/types/constants'

const Slide = ({
 children,
 slideDir,
 className = '',
 maxHeightPx = 300,
}: {
 children: ReactNode
 slideDir: 'up' | 'down'
 className?: string
 maxHeightPx?: number
}) => {
 const { amount } = useMultipleFrameAnim({
  checkpoints: [
   {
    key: 'amount',
    startAt: 0,
    duration: 1.2 * VIDEO_FPS,
    delay: 0,
   },
  ],
 })

 const style = (() => {
  const posAmount = `${(1 - amount) * maxHeightPx}px`
  switch (slideDir) {
   case 'up':
    return { top: posAmount }
   case 'down':
    return { bottom: posAmount }
   default:
    return { top: posAmount }
  }
 })()

 return (
  <div className={`relative ${className}`} style={style}>
   {children}
  </div>
 )
}

export default Slide
