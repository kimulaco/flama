import {
  delay,
  frameAnimation,
  animate
} from '../../src/flanim'

const setDelay = async () => {
  await delay(1000)
  console.log('1000 ms')
  await delay(2000)
  console.log('3000 ms')
  await delay(3000)
  console.log('6000 ms')
}

const setFlameAnimation = () => {
  const btn: HTMLElement | null = document.getElementById('FA-button')
  const box: HTMLElement | null = document.getElementById('FA-box')

  if (!btn || !box) return

  const startWidth = box.clientWidth
  const endWidth = 200
  const diffWidth = endWidth - startWidth

  btn.addEventListener('click', async () => {
    await frameAnimation(1000, (progress) => {
      box.style.width = (diffWidth * progress) + startWidth + 'px'
    })
    box.style.width = endWidth + 'px'
  })
}

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
      duration: 1000,
      ext: 'px'
    })
  })
}

setDelay()
setFlameAnimation()
setAnimate()