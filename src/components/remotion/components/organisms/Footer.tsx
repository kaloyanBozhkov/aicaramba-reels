import { useRef } from 'react'

import { Img, staticFile } from 'remotion'
import { Animated } from 'remotion-animated'

import { getBreath } from '@/animations/breathe'
import { getRotate } from '@/animations/rotate'
import useFrameAnim from '@/hooks/useFrameAnim'

import Card from '../atoms/Card'
import FancyTitle from '../atoms/FancyTitle'

const Footer = ({ className = '' }: { className?: string }) => {
 const breath = useRef(getBreath(-0.02, 0.02, 20)),
  rotate = useRef(getRotate(-5, 5, 40)),
  opacity = useFrameAnim({
   maxAtFrame: 60,
   delayUntilFrame: 20,
  })

 return (
  <div className={`flex flex-col gap-5 ${className}`}>
   <Card>
    <div className="flex flex-row justify-between items-stretch">
     <Animated animations={rotate.current}>
      <Img src={staticFile('/assets/images/logo-rounded.png')} width={200} height={200} />
     </Animated>
     <div className="flex flex-row gap-5">
      <Animated animations={breath.current} className="flex justify-center">
       <div className="flex flex-col gap-0 drop-shadow-xl justify-center">
        <FancyTitle className="bg-whiteGradient text-8xl leading-[80px]">order at</FancyTitle>
        <FancyTitle className="bg-whiteGradient text-6xl">aicaramba.io</FancyTitle>
       </div>
      </Animated>
      <Animated animations={breath.current} className="flex justify-center">
       <Img
        src={staticFile('/assets/icons/gift.svg')}
        width="150px"
        height="auto"
        className="invert"
       />
      </Animated>
     </div>
    </div>
   </Card>
   <div
    className="absolute top-full mt-[55px] left-0 right-0 flex justify-center"
    style={{ opacity: opacity }}
   >
    <Animated animations={breath.current}>
     <Card className="w-fit" bgClassName="-inset-y-1">
      <FancyTitle className="bg-whiteGradient text-[45px] leading-[80px] font-medium">
       Craft Your Designs, absolutely 100% Free!
      </FancyTitle>
     </Card>
    </Animated>
   </div>
  </div>
 )
}

export default Footer
