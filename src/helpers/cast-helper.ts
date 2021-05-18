export class CastHelper {
  static toBool(val: string | undefined): boolean {
    if (!val) {
      return false
    }
    // TODO: broader var support, eg/ '1'
    return val.toLowerCase() === 'true'
  }
}
