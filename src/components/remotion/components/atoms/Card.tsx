import { ReactNode } from 'react'

const Card = ({
 children,
 className = '',
 bgClassName = '',
}: {
 children: ReactNode
 className?: string
 bgClassName?: string
}) => {
 return (
  <div className={`relative z-0 ${className}`}>
   {children}
   <div
    className={`bg-black/20 backdrop-blur-sm absolute -inset-10 -inset-y-5 -z-10 rounded-3xl ${bgClassName}`}
   />
  </div>
 )
}

export default Card
