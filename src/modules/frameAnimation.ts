type FAFunc = (progress: number) => void

interface FATimer {
  start: number
  duration: number
}

const timer: FATimer = {
  start: 0,
  duration: 500
}

const loopFrame = (
  frameFunc: FAFunc,
  successCallback: () => void,
  failCallback: () => void
): void => {
  try {
    const elapsed: number = Date.now() - timer.start
    const progress: number = elapsed / timer.duration

    frameFunc(progress)

    if (elapsed < timer.duration) {
      requestAnimationFrame(() => {
        loopFrame(frameFunc, successCallback, failCallback)
      })
    } else {
      successCallback()
    }
  } catch (error) {
    failCallback()
  }
}

const frameAnimation = (
  duration: number,
  frameFunc: FAFunc
): Promise<void> => {
  return new Promise((resolve, reject) => {
    timer.start = Date.now()
    timer.duration = duration

    loopFrame(frameFunc, () => {
      resolve()
    }, () => {
      reject()
    })
  })
}

export default frameAnimation