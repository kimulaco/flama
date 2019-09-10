import {
  DEFAULT_DURATION,
  DEFAULT_DELAY,
  DEFAULT_EASING
} from '../utils/constants'
import easing from '../utils/easing'
import { getStyle } from '../utils/style'
import delay from './delay'
import frameAnimation from './frameAnimation'

interface AnimateOption {
  duration?: number
  delay?: number
  easing?: string
}

const animate = async (
  element: any,
  styles: any,
  option: AnimateOption = {}
): Promise<void> => {
  const optDuration: number = option.duration || DEFAULT_DURATION
  const optDelay: number = option.delay || DEFAULT_DELAY
  const optEasing: string = option.easing || DEFAULT_EASING
  const computedStyles: any = getStyle(element, Object.keys(styles))
  const diffStyles: any = {}
  let property: string

  for (property in computedStyles) {
    diffStyles[property] = styles[property] - computedStyles[property]
  }

  if (optDelay) await delay(optDelay)

  return await frameAnimation(optDuration, (progress: number) => {
    for (property in styles) {
      const easingProgress: number = easing[optEasing](progress)
      const styleDiff: number = diffStyles[property] * easingProgress
      element.style[property] = `${styleDiff + computedStyles[property]}px`
    }
  })
}

export default animate