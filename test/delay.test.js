const { performance } = require('perf_hooks');
const ALLOWABLE_RANGE = 10

const isAllowableRange = (elapsed, testTime) => {
  return elapsed >= testTime && elapsed <= testTime + ALLOWABLE_RANGE
}

describe('amp-custom', () => {
  const { delay } = require('../dist/flanim')

  test('delay(300) is success', async () => {
    const testTime = 300
    const start = performance.now()
    await delay(testTime)
    const elapsed = performance.now() - start
    console.log(`testTime: ${testTime}\nelapsed: ${elapsed}`)
    expect(isAllowableRange(elapsed, testTime)).toBeTruthy()
  })
})