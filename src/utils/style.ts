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

export const getStyle = (element: HTMLElement, styles: any) => {
  const conputedStyles: any = getComputedStyle(element)
  const resultStyles: any = {}

  for (const prop of styles) {
    resultStyles[prop] = conputedStyles[prop]
  }

  return resultStyles
}