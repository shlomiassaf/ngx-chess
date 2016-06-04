import { SVGChessBlock } from './svg-chess-block';
import { SVGChessPiece } from './svg-chess-piece';
import { SVGChessBanner } from './svg-chess-dialog';
import { SVGChessHighlight } from './svg-chess-highlight';

/**
 * Directives required for SVG board.
 * @type {SVGChessBlock|SVGChessPiece|SVGChessBanner|SVGChessHighlight|SVGChessMoveMarker[]}
 */
export const SVG_BOARD_DIRECTIVES = [
  SVGChessBlock,
  SVGChessPiece,
  SVGChessBanner,
  SVGChessHighlight
];

export { SVGChessBlock } from './svg-chess-block';
export { SVGChessPiece } from './svg-chess-piece';
export { SVGChessBanner } from './svg-chess-dialog';
export { SVGChessHighlight } from './svg-chess-highlight';
export { SVGChessBoard, BlockDropEvent, PieceDragEvent } from './svg-chess-board';

export { DOM_SVG_KIT_DIRECTIVES } from './providers';
