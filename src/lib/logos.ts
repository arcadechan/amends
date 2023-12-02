import { StaticImageData } from 'next/image'
import amendsLogoBlack from 'public/logo/logo-black.png'
import amendsLogoYellow from 'public/logo/logo-yellow.png'

interface LogosObject {
  [key: string]: StaticImageData
}

export default <LogosObject>{
  light: amendsLogoBlack,
  dark: amendsLogoYellow
}
