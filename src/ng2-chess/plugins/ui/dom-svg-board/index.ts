import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SVGChessBlock } from './svg-chess-block';
import { SVGChessPiece } from './svg-chess-piece';
import { SVGChessBanner } from './svg-chess-dialog';
import { SVGChessHighlight } from './svg-chess-highlight';
import { SVGChessBoard } from './svg-chess-board';

export { SVGChessBlock } from './svg-chess-block';
export { SVGChessPiece } from './svg-chess-piece';
export { SVGChessBanner } from './svg-chess-dialog';
export { SVGChessHighlight } from './svg-chess-highlight';
export { SVGChessBoard, BlockDropEvent, PieceDragEvent } from './svg-chess-board';

const DOM_SVG_KIT_DIRECTIVES = [
  SVGChessBoard,
  SVGChessBlock,
  SVGChessPiece,
  SVGChessBanner,
  SVGChessHighlight
];

@NgModule({
  declarations: [ ...DOM_SVG_KIT_DIRECTIVES ],
  /**
   * Import Angular's modules.
   */
  imports: [ CommonModule ],
  exports: [ ...DOM_SVG_KIT_DIRECTIVES ]
})
export class DomSvgBoardModule {

}