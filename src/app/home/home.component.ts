import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { ChessBoard, ChessBoardController, PieceColor, PlayerType } from 'ng2-chess';
import { DOM_SVG_KIT_DIRECTIVES } from 'ng2-chess/plugins/ui/dom-svg-board';
import { CHESSJS_CHESS_GAME_PROVIDERS } from 'ng2-chess/plugins/game/chessjs';

@Component({
  selector: 'home',
  providers: [ ...CHESSJS_CHESS_GAME_PROVIDERS ],
  directives: [ ...DOM_SVG_KIT_DIRECTIVES ],
  pipes: [ ],
  styles: [ require('./home.css') ],
  template: require('./home.html')
})
export class Home implements AfterViewInit {
  
  @ViewChild('board') private board: ChessBoard;

  constructor() {}


  ngAfterViewInit() {
    this.board.ctrl
      .init()
      .then( () => {
        this.board.ctrl
          .setPlayer(PieceColor.BLACK, PlayerType.HUMAN)
          .setPlayer(PieceColor.WHITE, PlayerType.HUMAN)
          .newGame();
      });
  }
  
 
}
