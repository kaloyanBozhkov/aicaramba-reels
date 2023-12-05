import { Composition } from 'remotion'

import products from '@/../public/products.json'
import Main from '@/components/remotion/scenes/Main.scene'
import { DURATION_IN_FRAMES, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from '@/types/constants'

export const RemotionRoot = () => {
 return (
  <>
   <Composition
    id="Main"
    component={Main}
    durationInFrames={DURATION_IN_FRAMES}
    fps={VIDEO_FPS}
    width={VIDEO_WIDTH}
    height={VIDEO_HEIGHT}
    defaultProps={{ artworkImageUrls: products.slice(0, 6) }}
   />
  </>
 )
}
