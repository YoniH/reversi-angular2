enum PlayerColors {
  BLACK,
  WHITE
}

namespace PlayerColors {
  export function getInverse(playerColor: PlayerColors) {
    return playerColor === PlayerColors.BLACK ? PlayerColors.WHITE : PlayerColors.BLACK;
  }
}

export default PlayerColors;
