import { Block } from 'ngx-chess';

export class BlockBaseComponent {
  x: number;
  y: number;
  block: Block;

  /**
   * The size of the block, this is used for calculating position.
   * The size is controlled by the board and the board should supply it.
   */
  size: number;

  setCoordinates() {
    this.x = this.block.row * this.size;
    this.y = this.block.col * this.size;
  }
  
  getTransform() {
    return `translate(${this.x}, ${this.y})`;
  }
}
