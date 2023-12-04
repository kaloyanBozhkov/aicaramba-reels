import Artwork from '../atoms/Artwork'
import TShirt from '../atoms/TShirt'

const TShirtPreview = ({
 className = '',
 artworkUrl,
 color,
 sex,
}: {
 className?: string
 artworkUrl: string
 color: 'white' | 'black'
 sex: 'male' | 'female'
}) => {
 return (
  <div className={`${className} relative`}>
   <Artwork
    artworkUrl={artworkUrl}
    className={`w-[40%] z-10 absolute`}
    style={{
     top: ARTWORK_CONFIG[color][sex].top,
     left: ARTWORK_CONFIG[color][sex].left,
     transform: `scale(${ARTWORK_CONFIG[color][sex].scale})`,
    }}
   />
   <TShirt color={color} sex={sex} className="w-fit" />
  </div>
 )
}

export default TShirtPreview

const ARTWORK_CONFIG = {
 black: {
  male: {
   top: '20%',
   left: '29%',
   scale: '.95',
  },
  female: {
   top: '15%',
   left: '29%',
   scale: '.95',
  },
 },
 white: {
  male: {
   top: '25%',
   left: '29%',
   scale: '1',
  },
  female: {
   top: '15%',
   left: '29%',
   scale: '1',
  },
 },
}
