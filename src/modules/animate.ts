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

interface AnimateOptionType {
  duration: number
  delay: number
  easing: string
}

interface AnimateOption {
  duration?: number
  delay?: number
  easing?: string
}

class FlamaAnimate {
  private option: AnimateOptionType = {
    duration: DEFAULT_DURATION,
    delay: DEFAULT_DELAY,
    easing: DEFAULT_EASING
  }

  private createDiffStyles (styles: Styles, computedStyles: Styles): Styles {
    const diffStyles: Styles = {}
    let prop: string

    for (prop in computedStyles) {
      const style: Styles = splitValueUnit(styles[prop])
      const computedStyle: Styles = splitValueUnit(computedStyles[prop])
      diffStyles[prop] = {
        value: style.value - computedStyle.value,
        unit: style.unit
      }
    }

    return diffStyles
  }

  async start(
    element: HTMLElement,
    styles: Styles,
    option: AnimateOption = {}
  ) {
    this.option = Object.assign(this.option, option)
    const computedStyles: Styles = getStyle(element, Object.keys(styles))
    const diffStyles: Styles = this.createDiffStyles(styles, computedStyles)

    if (this.option.delay) await delay(this.option.delay)

    return await frameAnimation.start(this.option.duration, (progress: number) => {
      let prop: string
      for (prop in styles) {
        const easingProgress: number = easing[this.option.easing](progress)
        const styleDiff: number = diffStyles[prop].value * easingProgress
        const styleValue = styleDiff + splitValueUnit(computedStyles[prop]).value
        element.style.setProperty(prop, `${styleValue}${diffStyles[prop].unit}`)
      }
    })
  }
}

const flamaAnimate = new FlamaAnimate()

export default flamaAnimate