import React, { useRef } from 'react'

import { useCurrentFrame } from 'remotion'

export const TypeWriter = ({
 text,
 cursorClassName,
 speed = 3,
}: {
 text: string
 cursorClassName?: string
 speed?: number
}) => {
 const frame = useCurrentFrame()
 const resetAt = useRef(0)
 const lastText = useRef(text)

 if (lastText.current !== text) {
  resetAt.current = frame
  lastText.current = text
 }

 const adjustedFrames = frame - resetAt.current
 // A new character every 3 (speed) frames
 const charsShown = Math.floor(adjustedFrames / speed)
 const textToShow = text.slice(0, charsShown)
 // Show the cursor while the text is typing, then start blinking
 const cursorShown =
  textToShow.length === text.length ? Math.floor(adjustedFrames / 10) % 2 === 1 : true

 return (
  <>
   {textToShow}
   <span
    className={`h-[60px] w-[3px] inline-block bg-black m-l-[4px] m-t-[-4px] align-middle ${cursorClassName}`}
    style={{
     opacity: Number(cursorShown),
    }}
   />
  </>
 )
}
