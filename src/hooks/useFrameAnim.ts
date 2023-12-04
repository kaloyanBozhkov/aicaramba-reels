import { useCurrentFrame } from 'remotion'

/**
 * returns 0...1 based on frame / maxAtFrame
 * optional delay calculation til frame reaches delayUntilFrame
 */
const useFrameAnim = ({
 maxAtFrame,
 delayUntilFrame,
}: {
 maxAtFrame: number
 delayUntilFrame?: number
}) => {
 const frame = useCurrentFrame()
 let curr = frame / maxAtFrame

 if (delayUntilFrame) {
  const newStartingPoint = frame - delayUntilFrame
  curr = newStartingPoint / maxAtFrame
  curr = curr < 0 ? 0 : curr
 }

 return Math.min(1, curr)
}

export default useFrameAnim
