import { Img, staticFile } from 'remotion'

import useOscillate from '@/hooks/useOscillate'

import FancyTitle from '../atoms/FancyTitle'

const Footer = () => {
 const state = useOscillate({ transitionS: 2 }),
  brightness = state ? 'brightness-[1] ' : 'brightness-100'

 return (
  <div className="flex flex-row justify-between">
   <Img
    src={staticFile('/assets/images/logo-rounded.png')}
    width={180}
    height={180}
    className={`transition duration-[1s] ${brightness}`}
   />
   <div className="flex flex-col gap-0 drop-shadow-xl">
    <FancyTitle className={`bg-whiteGradient text-8xl transition duration-[1s] ${brightness}`}>
     AICaramba
    </FancyTitle>
    <FancyTitle className={`bg-whiteGradient text-6xl transition duration-[1s] ${brightness}`}>
     www.aicaramba.io
    </FancyTitle>
   </div>
  </div>
 )
}

export default Footer
