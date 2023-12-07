import { AbsoluteFill, Audio, Series, staticFile } from 'remotion'

import useIncEveryFrames from '@/hooks/useIncEveryFrames'
import { TSHIRT_SLIDE_DURATION_IN_FRAMES, VIDEO_FPS } from '@/types/constants'

import FancyTitle from '../components/atoms/FancyTitle'
import { TypeWriter } from '../components/atoms/TypeWriter'
import DynamicBg from '../components/organisms/DynamicBg'
import Footer from '../components/organisms/Footer'
import SlideShirts from '../components/organisms/SlideShirts'
import Slide from '../components/templates/Slide'

const READ_FOR = 2
const ENTER_FOR = 2
const DURATION_TEXT = READ_FOR + ENTER_FOR

export type MainProps = {
 artworkImageUrls: string[]
 messages: string[]
}

const Main = ({ artworkImageUrls, messages }: MainProps) => {
 const ps = artworkImageUrls,
  msgIdx = useIncEveryFrames({
   everyS: DURATION_TEXT,
   start: 0,
  })

 const footer = (
   <div className="relative z-0 mx-20">
    <Footer />
    <div className="bg-black/20 backdrop-blur-sm absolute -inset-10 -inset-y-5 -z-10 rounded-3xl" />
   </div>
  ),
  header = (
   <div className="relative z-0 mx-20">
    <FancyTitle className="text-[50px] bg-whiteGradient">
     <TypeWriter
      text={messages[msgIdx]}
      speed={messages[msgIdx].length / (VIDEO_FPS * ENTER_FOR)}
      cursorClassName="bg-white min-w-[30px]"
     />
    </FancyTitle>
    <div className="bg-black/20 backdrop-blur-sm absolute -inset-10 -inset-y-5 -z-10 rounded-3xl" />
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
    <div className="h-full w-full px-[40px] py-[250px] flex flex-col">
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
