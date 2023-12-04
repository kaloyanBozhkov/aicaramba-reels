import { useCurrentFrame } from 'remotion'

type Frame = number
/**
 * returns { key: 0...1 }
 */
const useMultipleFrameAnim = <T extends string>({
 checkpoints,
}: {
 checkpoints: {
  delay?: Frame
  duration: Frame
  startAt: Frame
  key: T
 }[]
}) => {
 const frame = useCurrentFrame()

 const current = checkpoints.reduce(
  (acc, { startAt, duration, key, delay = 0 }) => {
   const startingPoint = startAt + delay
   // not started yet
   if (startingPoint > frame)
    return {
     ...acc,
     [key]: 0,
    }

   let curr = (frame - startingPoint) / duration

   return {
    ...acc,
    [key]: Math.min(1, curr),
   }
  },
  {} as Record<T, number>
 )

 return current
}

export default useMultipleFrameAnim
