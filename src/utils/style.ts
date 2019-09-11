import { Styles } from '../types'

export const splitValueUnit = (value: string) => {
  const units = ['px', '%', 'vw', 'vh', 'em', 'rem']
  let unit: string

  for (unit of units) {
    const regexp = new RegExp(`${unit}$`)
    if (regexp.test(value)) {
      return {
        value: parseInt(value.replace(regexp, ''), 10),
        unit: unit
      }
    }
  }

  return {
    value: Number(value),
    unit: 'px'
  }
}

export const getStyle = (element: HTMLElement, styles: Styles) => {
  const conputedStyles: Styles = getComputedStyle(element)
  const resultStyles: Styles = {}

  for (const prop of styles) {
    resultStyles[prop] = conputedStyles[prop]
  }

  return resultStyles
}