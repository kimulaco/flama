import { DEFAULT_DURATION, DEFAULT_DELAY } from '../utils/constants'
import { getStyle } from '../utils/style'
import delay from './delay'
import frameAnimation from './frameAnimation'

interface AnimateOption {
  duration?: number
  delay?: number
}

const animate = async (
  element: any,
  styles: any,
  option: AnimateOption = {}
): Promise<void> => {
  const optDuration: number = option.duration || DEFAULT_DURATION
  const optDelay: number = option.delay || DEFAULT_DELAY
  const computedStyles: any = getStyle(element, Object.keys(styles))
  const diffStyles: any = {}
  let property: string

  for (property in computedStyles) {
    diffStyles[property] = styles[property] - computedStyles[property]
  }

  if (optDelay) {
    await delay(optDelay)
  }

  return await frameAnimation(optDuration, (progress: number) => {
      for (property in styles) {
        element.style[property] = (diffStyles[property] * progress) + computedStyles[property] + 'px'
      }
    }
  )
}

export default animate