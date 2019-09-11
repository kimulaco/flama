import { animate } from '../../src/flama'

const setAnimate = () => {
  const btn: HTMLElement | null = document.getElementById('F-button')
  const box: HTMLElement | null = document.getElementById('F-box')

  if (!btn || !box) return

  btn.addEventListener('click', async () => {
    await animate(box, {
      'width': '200px',
      'height': '200px',
      'margin-top': '100px',
      'margin-left': '100px',
    }, {
      easing: 'easeOutQuad'
    })
  })
}

setAnimate()