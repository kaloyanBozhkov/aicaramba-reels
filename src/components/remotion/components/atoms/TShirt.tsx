import { Img, ImgProps, staticFile } from 'remotion'

const TShirt = ({
 color,
 sex,
 ...imgProps
}: { color: 'black' | 'white'; sex: 'male' | 'female' } & Omit<Partial<ImgProps>, 'ref'>) => {
 return <Img src={staticFile(`/assets/${color}-shirt-${sex}-no-bg.png`)} {...imgProps} />
}

export default TShirt
