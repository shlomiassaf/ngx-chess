export interface BoardMeta {
  rowCount: number;
  colCount: number;
}
export interface Block {
  /**
   * The index on the board where the board is represented as single dimension array.
   * For example, in a 8x8 there are 64 blocks represented in an array from 0 to 63 where 0 is a8
   * and 63 is h1.
   */
  index: number;

  isOdd: boolean;

  /**
   * The row number.
   */
  row: number;

  /**
   * The column number
   */
  col: number;

  /**
   * A file/rank representation of the block, e.g: a8, g5 etc
   */
  pos: string;

  /**
   * Read only meta about the board setup.
   */
  meta: BoardMeta;
}

export interface BlockConstructor {
  new(index: number): Block;
}

export abstract class BaseBlock implements Block {
  /**
   * The index on the board where the board is represented as single dimension array.
   * For example, in a 8x8 there are 64 blocks represented in an array from 0 to 63 where 0 is a8
   * and 63 is h1.
   */
  index: number;

  isOdd: boolean;

  /**
   * The row number.
   */
  row: number;

  /**
   * The column number
   */
  col: number;

  /**
   * A file/rank representation of the block, e.g: a8, g5 etc
   */
  pos: string;

  // TODO: Set readonly when TS supports readonly modifiers.
  /**
   * Read only meta about the board setup.
   */
  meta: BoardMeta;

  constructor( index: number ) {
    this.index = index;
    this.row = Math.floor(index / this.meta.rowCount);
    this.col = index % this.meta.colCount;
    this.pos = String.fromCharCode(97 + this.row) + (this.meta.rowCount - this.col);
    this.isOdd = this.calcIsOdd(this.row, this.col);
  };

  private calcIsOdd(rowIdx: number, colIdx: number): boolean {
    return rowIdx % 2 ? !(colIdx % 2) : !!(colIdx % 2);
  }

  static factory(meta: BoardMeta): BlockConstructor {
    let blockType = class RuntimeBlock extends BaseBlock {};

    Object.defineProperty(blockType.prototype, 'meta', {
      configurable: false,
      enumerable: false,
      value: meta,
      writable: false
    });

    return blockType;
  }

  /**
   * Returns a file/rank position from a SAN move instruction.
   * @param san
   * @param srcPos the source position, needed when castling.
   */
  static sanToPos(san: string, srcPos: string): string {
    let pos = /[a-h][1-8]/.exec(san);
    if (pos) {
      return pos[0];
    } else if (san === 'O-O') {
      return 'g' + srcPos[1]
    } else if (san === 'O-O-O') {
      return 'c' + srcPos[1];
    } else {
      return null;
    }
  }

  /**
   * Give a SAN move instruction returns the destination block the index number in the flatten array.
   * @param san
    @param srcPos the source position, needed when castling.
   * @param rCount
   * @returns {number}
   */
  static sanToIndex(san: string, srcPos: string, rCount: number = 8): number {
    return BaseBlock.posToIndex(BaseBlock.sanToPos(san, srcPos));
  }

  /**
   * Give a file/rank position (a8) returns the destination block the index number in the flatten array.
   * @param pos
   * @param rCount
   * @returns {number}
     */
  static posToIndex(pos: string, rCount: number = 8): number {
    let row = pos.charCodeAt(pos.length - 2) - 97, col = rCount - Number(pos[pos.length - 1]);
    return row * rCount + col;
  }

  /**
   * Given X & Y coordinates, size and row count, calculates the index of the block.
   * Notes that all units are raw and before and transformation, if you send a point make sure
   * to transform it to it's base size.
   * @param x
   * @param y
   * @param size
   * @param rCount
   * @returns {number}
     */
  static pointToIndex(x: number, y: number, size: number = 75, rCount: number = 8): number {
    let row = Math.floor(x/size);
    let col = Math.floor(y/size);
    return row * rCount + col;
  }
}
