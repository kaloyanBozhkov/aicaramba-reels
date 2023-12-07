import { useMemo } from 'react'

import { Animated } from '~remotion-animated'

import { getBreath } from '@/animations/breathe'
import { TSHIRT_SLIDE_DURATION_IN_FRAMES } from '@/types/constants'

import Slider from '../molecules/Slider'
import TShirtPreview from '../molecules/TShirtPreview'

const SlideShirts = ({ ps }: { ps: string[] }) => {
 const shirts = useMemo(() => {
  const breath = getBreath(-0.05, 0.15, 30)
  return ps.map((artworkUrl, idx) => (
   <Animated key={artworkUrl + idx} animations={breath}>
    <TShirtPreview artworkUrl={artworkUrl} color={idx % 2 === 0 ? 'black' : 'white'} sex="male" />
   </Animated>
  ))
 }, [ps])

 return (
  <Slider durationInFrames={TSHIRT_SLIDE_DURATION_IN_FRAMES} transitionDurationS={0.4}>
   {shirts}
  </Slider>
 )
}

export default SlideShirts
