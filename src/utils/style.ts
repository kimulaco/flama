export const getStyle = (element: HTMLElement, styles: any) => {
  const conputedStyles: any = getComputedStyle(element)
  const resultStyles: any = {}

  for (const prop of styles) {
    resultStyles[prop] = conputedStyles[prop]
  }

  return resultStyles
}
