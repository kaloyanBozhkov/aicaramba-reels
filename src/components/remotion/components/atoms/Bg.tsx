import { Img } from 'remotion'

const Bg = ({ src, style }: { src: string; style?: object }) => {
 return (
  <div
   className="absolute inset-0 bg-cover bg-center -z-10 flex items-center justify-center"
   style={style}
  >
   <div className="relative w-max h-full flex items-center justify-center bg-white overflow-hidden">
    <div className="w-full h-full backdrop-blur-sm bg-white/10 absolute z-10" />
    <Img src={src} className="h-full w-auto max-w-none z-[5]" />
    <div className="w-full h-full backdrop-blur-lg bg-white/10 absolute z-[1]" />
    <Img src={src} className="h-full w-auto max-w-none scale-[3] absolute -z-1" />
   </div>
  </div>
 )
}

export default Bg
