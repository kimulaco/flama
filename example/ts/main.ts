import { animate } from '../../src/flanim'

const setAnimate = () => {
  const btn: HTMLElement | null = document.getElementById('F-button')
  const box: HTMLElement | null = document.getElementById('F-box')

  if (!btn || !box) return

  btn.addEventListener('click', async () => {
    await animate(box, {
      'width': 200,
      'height': 200,
      'margin-top': 100,
      'margin-left': 100,
    }, {
      easing: 'easeOutQuad'
    })
  })
}

setAnimate()