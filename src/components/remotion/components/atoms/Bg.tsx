import { Img } from 'remotion'

const Bg = ({ src, style }: { src: string; style?: object }) => {
 return (
  <div
   className="absolute inset-0 bg-cover bg-center -z-10 flex items-center justify-center"
   style={style}
  >
   <div className="relative w-max h-full flex items-center justify-center">
    <div className="w-full h-full backdrop-blur-md bg-white/10 absolute" />
    <Img src={src} className="h-full w-auto max-w-none" />
   </div>
  </div>
 )
}

export default Bg
