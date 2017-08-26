import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { ChessBoard, PieceColor, PlayerType } from 'ngx-chess';
import { CHESSJS_CHESS_GAME_PROVIDERS } from 'ngx-chess/plugins/chessjs';

@Component({
  selector: 'home',
  providers: [ ...CHESSJS_CHESS_GAME_PROVIDERS ],
  styleUrls: [ 'home.component.scss' ],
  templateUrl: 'home.component.html'
})
export class HomeComponent implements AfterViewInit {
  
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
