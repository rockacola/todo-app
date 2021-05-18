export class TimingHelper {
  static sleep(ms: number): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve()
      }, ms)
    })
  }
}
