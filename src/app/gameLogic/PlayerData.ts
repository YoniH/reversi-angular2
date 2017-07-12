export default class PlayerData {
  get name(): string { return this._name; };
  get isComputerPlayer(): boolean { return this._isComputerPlayer; };
  get computerPlayerLevel(): number { return this._computerPlayerLevel; };

  constructor(
    private _name: string,
    private _isComputerPlayer: boolean,
    private _computerPlayerLevel: number
  ) {
    if (_isComputerPlayer && (!_computerPlayerLevel || _computerPlayerLevel < 1)) {
      throw new Error('must set a valid computer level');
    }
  }
}
