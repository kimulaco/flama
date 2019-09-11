import {
  DEFAULT_DURATION,
  DEFAULT_DELAY,
  DEFAULT_EASING
} from '../utils/constants'
import easing from '../utils/easing'
import { getStyle, splitValueUnit } from '../utils/style'
import delay from './delay'
import frameAnimation from './frameAnimation'
import { Styles } from '../types'

interface AnimateOption {
  duration?: number
  delay?: number
  easing?: string
}

const animate = async (
  element: HTMLElement,
  styles: Styles,
  option: AnimateOption = {}
): Promise<void> => {
  const optDuration: number = option.duration || DEFAULT_DURATION
  const optDelay: number = option.delay || DEFAULT_DELAY
  const optEasing: string = option.easing || DEFAULT_EASING
  const computedStyles: AnimateStyles = getStyle(element, Object.keys(styles))
  const diffStyles: AnimateStyles = {}
  let prop: string

  for (prop in computedStyles) {
    const style: AnimateStyles = splitValueUnit(styles[prop])
    const computedStyle: AnimateStyles = splitValueUnit(computedStyles[prop])
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
      element.style.setProperty(prop, `${styleValue}${diffStyles[prop].unit}`)
    }
  })
}

export default animate