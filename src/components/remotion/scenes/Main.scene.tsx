import { AbsoluteFill, Audio, Series, staticFile } from 'remotion'

import useRngEveryFrames from '@/hooks/useRngEveryFrames'
import { TSHIRT_SLIDE_DURATION_IN_FRAMES, VIDEO_FPS, messages } from '@/types/constants'

import FancyTitle from '../components/atoms/FancyTitle'
import { TypeWriter } from '../components/atoms/TypeWriter'
import DynamicBg from '../components/organisms/DynamicBg'
import Footer from '../components/organisms/Footer'
import SlideShirts from '../components/organisms/SlideShirts'
import Slide from '../components/templates/Slide'

const DURATION_TEXT = 4

export type MainProps = {
 artworkImageUrls: string[]
}

const Main = ({ artworkImageUrls }: MainProps) => {
 const ps = artworkImageUrls
 const msgN = useRngEveryFrames({ everyS: DURATION_TEXT, min: 0, max: messages.length - 1 })
 const msg = messages[msgN]

 const footer = (
   <div className="relative z-0">
    <Footer />
    <div className="bg-black/20 backdrop-blur-sm absolute -inset-10 -z-10" />
   </div>
  ),
  header = (
   <div className="relative z-0">
    <FancyTitle className="text-6xl bg-whiteGradient">
     <TypeWriter
      text={msg}
      speed={msg.length / (VIDEO_FPS * 2)}
      cursorClassName="bg-white min-w-[30px]"
     />
    </FancyTitle>
    <div className="bg-black/20 backdrop-blur-sm absolute -inset-10 -z-10" />
   </div>
  )

 return (
  <div className="w-full h-full p-10 bg-white z-0 relative">
   <div className="w-full h-full flex flex-col items-center">
    <Series>
     <Series.Sequence durationInFrames={TSHIRT_SLIDE_DURATION_IN_FRAMES}>
      <div className="w-full mt-auto relative h-[1500px]">
       <SlideShirts ps={ps} />
      </div>
     </Series.Sequence>
    </Series>
   </div>
   <AbsoluteFill id="overlay-stuff">
    <div className="h-full w-full p-10 flex flex-col">
     <Slide slideDir="down">{header}</Slide>
     <Slide slideDir="up" className="mt-auto">
      {footer}
     </Slide>
    </div>
   </AbsoluteFill>
   {/* <AbsoluteFill>
    <div className="h-full w-full flex flex-col gap-8">
     <Card>
      <FancyTitle className="text-[100px] leading-[120px]">
       <TypeWriter text="AICaramba!" speed={10} cursorClassName="bg-primaryGradient" />
      </FancyTitle>
     </Card>
     <TripleText className="text-8xl" text="AICaramba" />
    </div>
   </AbsoluteFill> */}
   <DynamicBg ps={ps} transitionDurationS={0.4} />
   <Audio src={staticFile('/assets/audio/c.mp3')} />
  </div>
 )
}

export default Main
