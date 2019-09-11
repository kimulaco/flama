import {
  DEFAULT_DURATION,
  DEFAULT_DELAY,
  DEFAULT_EASING
} from '../utils/constants'
import easing from '../utils/easing'
import { getStyle, splitValueUnit } from '../utils/style'
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
  let prop: string

  for (prop in computedStyles) {
    const style: any = splitValueUnit(styles[prop])
    const computedStyle: any = splitValueUnit(computedStyles[prop])
    diffStyles[prop] = {
      value: style.value - computedStyle.value,
      unit: style.unit
    }
  }

  if (optDelay) await delay(optDelay)

  return await frameAnimation.start(optDuration, (progress: number) => {
    for (prop in styles) {
      const easingProgress: number = easing[optEasing](progress)
      const styleDiff: number = diffStyles[prop].value * easingProgress
      const styleValue = styleDiff + splitValueUnit(computedStyles[prop]).value
      element.style[prop] = `${styleValue}${diffStyles[prop].unit}`
    }
  })
}

export default animate