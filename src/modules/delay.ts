const delay = (time: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        resolve()
      }, time)
    } catch (error) {
      reject(error)
    }
  })
}

export default delay
