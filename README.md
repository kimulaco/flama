# flamin

## Use

```js
const { animate } = require('./flanim')

const main = async () => {
  const box = document.getElementById('box')

  await animate(box, {
    'width': 200,
    'height': 200,
    'margin-top': 100,
    'margin-left': 100,
  }, {
    duration: 2000,
    delay: 200
  })
}

main()
```