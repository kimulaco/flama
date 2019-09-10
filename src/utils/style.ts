export const getStyle = (element: HTMLElement, styles: any) => {
  const conputedStyles: any = getComputedStyle(element)
  const resultStyles: any = {}

  for (const prop of styles) {
    resultStyles[prop] = parseInt(conputedStyles[prop], 16)
  }

  return resultStyles
}
