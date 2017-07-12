import PlayerColors from './gameLogic/enums/PlayerColors';

export default class Utils {
  static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static now() {
    return new Date().getTime();
  }

  static uuidV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
