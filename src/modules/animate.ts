import { DEFAULT_DURATION } from '../default'
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
  const computedStyles: any = getComputedStyle(element)
  const diffStyles: any = {}
  const currentStyles: any = {}
  let property: string

  for (property in styles) {
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