import { DEFAULT_DURATION } from '../default'
import frameAnimation from './frameAnimation'

interface AnimateOption {
  duration: number
  ext: string
}

const getStyle = (element: any, property: string) => {
  if (property === 'width') {
    return element.clientWidth
  } else if (property === 'height') {
    return element.clientHeight
  }
  return
}

const animate = async (
  element: any,
  styles: any,
  option: AnimateOption
): Promise<void> => {
  const diffStyles: any = {}
  const currentStyles: any = {}
  let property: string

  for (property in styles) {
    currentStyles[property] = getStyle(element, property)
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