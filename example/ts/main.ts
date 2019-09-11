import { animate } from '../../src/flama'

const setAnimate = () => {
  const btn: HTMLElement | null = document.getElementById('F-button')
  const box: HTMLElement | null = document.getElementById('F-box')

  if (!btn || !box) return

  btn.addEventListener('click', async () => {
    await animate.start(box, {
      'width': '50%',
      'height': '200px',
      'margin-top': '100px',
      'margin-left': 100
    }, {
      easing: 'easeOutQuad'
    })
  })
}

setAnimate()