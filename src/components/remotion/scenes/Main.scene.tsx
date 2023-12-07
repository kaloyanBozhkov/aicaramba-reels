import { AbsoluteFill, Audio, Series, staticFile } from 'remotion'

import useIncEveryFrames from '@/hooks/useIncEveryFrames'
import { TSHIRT_SLIDE_DURATION_IN_FRAMES, VIDEO_FPS } from '@/types/constants'

import Card from '../components/atoms/Card'
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
 audioStartFrom: number
 audioFileName: string
}

const Main = ({
 artworkImageUrls,
 messages,
 audioStartFrom = 0,
 audioFileName = 'c1',
}: MainProps) => {
 const ps = artworkImageUrls,
  msgIdx = useIncEveryFrames({
   everyS: DURATION_TEXT,
   start: 0,
  })

 const footer = <Footer className="mx-20" />,
  header = (
   <Card className="-inset-y-5 mx-20">
    <FancyTitle className="text-[50px] bg-whiteGradient">
     <TypeWriter
      text={messages[msgIdx]}
      speed={messages[msgIdx].length / (VIDEO_FPS * ENTER_FOR)}
      cursorClassName="bg-white min-w-[30px]"
     />
    </FancyTitle>
   </Card>
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
     <Slide slideDir="up" className="mt-auto" maxHeightPx={500}>
      {footer}
     </Slide>
    </div>
   </AbsoluteFill>
   <DynamicBg ps={ps} transitionDurationS={0.4} />
   <Audio
    src={staticFile(`/assets/audio/${audioFileName}.mp3`)}
    startFrom={audioStartFrom * VIDEO_FPS}
   />
  </div>
 )
}

export default Main
