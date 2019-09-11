type FAFunc = (progress: number) => void
type FACallback = () => void

class FlameAnimation {
  private requestId: any = null
  private startTime = 0
  private duration = 500

  private loopFrame(
    frameFunc: FAFunc,
    successCallback: FACallback,
    failCallback: FACallback
  ): void {
    try {
      const elapsed: number = Date.now() - this.startTime
      const progress: number = elapsed / this.duration
      frameFunc(progress)
      if (elapsed < this.duration) {
        this.requestId = requestAnimationFrame(() => {
          this.loopFrame(frameFunc, successCallback, failCallback)
        })
      } else {
        successCallback()
      }
    } catch (error) {
      failCallback()
    }
  }

  start(duration: number, frameFunc: FAFunc): Promise<void> {
    return new Promise((resolve, reject) => {
      this.startTime = Date.now()
      this.duration = duration

      this.loopFrame(frameFunc, () => {
        resolve()
      }, () => {
        reject()
      })
    })
  }

  stop() {
    cancelAnimationFrame(this.requestId)
  }
}

export default new FlameAnimation()