import { Img, ImgProps } from 'remotion'

const Artwork = ({
 artworkUrl,
 ...imgProps
}: { artworkUrl: string } & Omit<Partial<ImgProps>, 'ref'>) => {
 return <Img src={artworkUrl} {...imgProps} />
}

export default Artwork
