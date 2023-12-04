import { ReactNode } from 'react'

const Card = ({ children }: { children: ReactNode }) => {
 return (
  <div className="p-8 rounded-[20px] overflow-hidden shadow-l relative z-0">
   {children}
   <div className="absolute inset-0 w-full h-full backdrop-blur-md bg-white/60 -z-10" />
  </div>
 )
}

export default Card
