import { DEFAULT_DURATION } from '../default'
import { getStyle } from '../utils/style'
import frameAnimation from './frameAnimation'

interface AnimateOption {
  duration: number
  ext: string
}

const animate = async (
  element: any,
  styles: any,
  option: AnimateOption
): Promise<void> => {
  const computedStyles: any = getStyle(element, Object.keys(styles))
  const diffStyles: any = {}
  const currentStyles: any = {}
  let property: string

  console.log(computedStyles)

  for (property in computedStyles) {
    currentStyles[property] = parseInt(computedStyles[property], 16)
    diffStyles[property] = styles[property] - currentStyles[property]
  }

  return await frameAnimation(
    option.duration || DEFAULT_DURATION,
    (progress: number) => {
      for (property in styles) {
        element.style[property] = (diffStyles[property] * progress) + currentStyles[property] + option.ext
      }
    }
  )
}

export default animate