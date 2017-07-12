export default class CommonFixedSizes {
  public static readonly WIDE_BORDER = 5;

  public static readonly TILE_SIZE = 30;
  public static readonly TILE_MARGIN = 2;
  public static readonly TILE_BORDER = 1;
  public static readonly BOARD_SIZE = (CommonFixedSizes.TILE_SIZE + CommonFixedSizes.TILE_MARGIN * 2 + CommonFixedSizes.TILE_BORDER * 2) * 8 - CommonFixedSizes.TILE_MARGIN * 2;
}
