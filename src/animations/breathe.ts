import { Scale } from '~remotion-animated'

export const getBreath = (amountDown = -0.2, amountUp = 0.2, frames = 30) => {
 const down = 1 + amountDown,
  up = 1 + amountUp

 return new Array(200).fill(null).reduce(
  (acc, _, idx) => [
   ...acc,
   Scale({
    by: idx % 2 === 0 ? down : up,
    start: idx * frames,
    duration: frames,
   }),
   Scale({
    by: idx % 2 === 0 ? 1 / down : 1 / up,
    start: (idx + 1) * frames,
    duration: frames,
   }),
  ],
  []
 )
}
