# flama

## Use

```js
const { animate } = require('./flama')

const main = async () => {
  const box = document.getElementById('box')

  await animate(box, {
    'width': '50%',
    'height': '200px',
    'margin-top': '100px',
    'margin-left': 100
  }, {
    easing: 'easeOutQuad',
    duration: 2000,
    delay: 200
  })
}

main()
```