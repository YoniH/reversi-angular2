import PlayerData from './PlayerData';
import PlayerColors from './enums/PlayerColors';

export default class Players {
  constructor(
    private _black: PlayerData,
    private _white: PlayerData
  ) { }

  get(playerColor: PlayerColors): PlayerData {
    return playerColor === PlayerColors.BLACK ? this._black : this._white;
  }
}
