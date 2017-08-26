import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SVGChessBlock } from './svg-chess-block/svg-chess-block.component';
import { SVGChessPiece } from './svg-chess-piece/svg-chess-piece.component';
import { SVGChessBanner } from './svg-chess-dialog/svg-chess-dialog.component';
import { SVGChessHighlight } from './svg-chess-highlight/svg-chess-highlight.component';
import { SVGChessBoard } from './svg-chess-board/svg-chess-board.component';

@NgModule({
  declarations: [
    SVGChessBoard,
    SVGChessBlock,
    SVGChessPiece,
    SVGChessBanner,
    SVGChessHighlight
  ],
  imports: [ CommonModule ],
  exports: [
    SVGChessBoard,
    SVGChessBlock,
    SVGChessPiece,
    SVGChessBanner,
    SVGChessHighlight
  ]
})
export class DomSvgBoardModule {

}