import { useMemo } from 'react'

import { TSHIRT_SLIDE_DURATION_IN_FRAMES } from '@/types/constants'

import Slider from '../molecules/Slider'
import TShirtPreview from '../molecules/TShirtPreview'

const SlideShirts = ({ ps }: { ps: string[] }) => {
 const shirts = useMemo(() => {
  return ps.map((artworkUrl, idx) => (
   <TShirtPreview
    key={artworkUrl + idx}
    artworkUrl={artworkUrl}
    color={idx % 2 === 0 ? 'black' : 'white'}
    sex="male"
   />
  ))
 }, [ps])

 return (
  <Slider durationInFrames={TSHIRT_SLIDE_DURATION_IN_FRAMES} transitionDurationS={0.4}>
   {shirts}
  </Slider>
 )
}

export default SlideShirts
