import { type ReactNode } from 'react'

const FancyTitle = ({
 children,
 className,
 style,
}: {
 children: ReactNode
 className?: string
 style?: object
}) => {
 return (
  <h1
   className={`bg-clip-text bg-primaryGradient text-transparent drop-shadow-md font-semibold tracking-tighter ${className}`}
   style={style}
  >
   {children}
  </h1>
 )
}

export default FancyTitle
