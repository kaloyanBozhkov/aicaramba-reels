import { Rotate } from 'remotion-animated'

export const getRotate = (amountDown = -20, amountUp = 20, frames = 30) =>
 new Array(200).fill(null).reduce(
  (acc, _, idx) => [
   ...acc,
   Rotate({
    degrees: idx % 2 === 0 ? amountDown : amountUp,
    start: idx * frames,
    duration: frames,
   }),
   // return to normal before next
   Rotate({
    degrees: idx % 2 === 0 ? amountUp : amountDown,
    start: (idx + 1) * frames,
    duration: frames,
   }),
  ],
  []
 )
