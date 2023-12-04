import React from 'react'

import type { NextPage } from 'next'
import Head from 'next/head'

import products from '@/../public/products.json'
import Main from '@/components/remotion/scenes/Main.scene'
import { DURATION_IN_FRAMES, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from '@/types/constants'
import { Player } from '@remotion/player'

const Home: NextPage = () => {
 return (
  <div>
   <Head>
    <title>Remotion and Next.js</title>
    <meta name="description" content="Remotion and Next.js" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <div className="w-max h-max bg-red">
    <div className="scale-50 border-black border-[1px] translate-y-[-25%]">
     <Player
      component={Main}
      inputProps={{
       artworkImageUrls: products.slice(0, 5),
      }}
      durationInFrames={DURATION_IN_FRAMES}
      fps={VIDEO_FPS}
      compositionHeight={VIDEO_HEIGHT}
      compositionWidth={VIDEO_WIDTH}
      controls
      autoPlay
      loop
     />
    </div>
   </div>
  </div>
 )
}

export default Home
