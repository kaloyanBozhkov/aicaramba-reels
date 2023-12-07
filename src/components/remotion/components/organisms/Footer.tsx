import { useRef } from 'react'

import { Img, staticFile } from 'remotion'
import { Animated } from 'remotion-animated'

import { getBreath } from '@/animations/breathe'
import { getRotate } from '@/animations/rotate'
import useOscillate from '@/hooks/useOscillate'

import FancyTitle from '../atoms/FancyTitle'

const Footer = () => {
 const state = useOscillate({ transitionS: 2 }),
  brightness = state ? 'brightness-[1] ' : 'brightness-100',
  breath = useRef(getBreath(-0.02, 0.02, 20)),
  rotate = useRef(getRotate(-5, 5, 40))

 return (
  <div className="flex flex-row justify-between">
   <Animated animations={rotate.current}>
    <Img
     src={staticFile('/assets/images/logo-rounded.png')}
     width={200}
     height={200}
     className={`transition duration-[1s] ${brightness}`}
    />
   </Animated>
   <Animated animations={breath.current}>
    <div className="flex flex-col gap-0 drop-shadow-xl justify-center">
     <FancyTitle className={`bg-whiteGradient text-8xl transition duration-[1s] ${brightness}`}>
      order at
     </FancyTitle>
     <FancyTitle className={`bg-whiteGradient text-6xl transition duration-[1s] ${brightness}`}>
      aicaramba.io
     </FancyTitle>
    </div>
   </Animated>
  </div>
 )
}

export default Footer
