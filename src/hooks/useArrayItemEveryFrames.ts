import { useRef } from 'react'

import { useCurrentFrame } from 'remotion'

import useRngEveryFrames from './useRngEveryFrames'

const useArrayItemEveryFrames = <T>({
 initialArr,
 everyS,
}: {
 initialArr: T[]
 everyS: number
}) => {
 const remainingMessages = useRef([...initialArr])
 const currentMessage = useRef(remainingMessages.current[0])
 const frame = useCurrentFrame()

 if (frame === 0) {
  remainingMessages.current = [...initialArr]
 }

 useRngEveryFrames({
  everyS,
  min: 0,
  max: remainingMessages.current.length - 1,
  onMatchCallback: (msgN) => {
   currentMessage.current = remainingMessages.current[msgN]
   remainingMessages.current = remainingMessages.current.filter(
    (m) => m !== remainingMessages.current[Math.floor(msgN)]
   )
  },
 })

 return currentMessage.current
}

export default useArrayItemEveryFrames
