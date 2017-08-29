import { Component, ViewChild, AfterViewInit, OnDestroy, TemplateRef } from '@angular/core';
import { MdSelectChange, MdDialog } from '@angular/material';

import { Stockfish } from 'es6-stockfish';
import { BoardDialogService, ChessBoard, ChessBoardController, PieceColor, PlayerType } from 'ngx-chess';
import { CHESSJS_AI_CHESS_GAME_PROVIDERS, StockfishFactory } from 'ngx-chess/plugins/chessjs-ai';
import { getStockfish } from './fishwrap.shared';
import { BoardSizeChangeEvent } from 'ngx-chess/plugins/dom-svg-board';
import { GameDialogService } from '../game-dialog/game-dialog.service';

class Player {
  get rawtype(): string {
    return PlayerType[this.type];
  }
  set rawtype(value: string) {
    this.type = PlayerType[value];
  }
  constructor(public color: PieceColor, public type: PlayerType, public aiIndex: number) {

  }
}

const WEBWORKER_SUPPORTED = typeof(Worker) !== "undefined";

export class WebWorkerStockfishFactory extends StockfishFactory {
  create(): Promise<Stockfish> {
    return getStockfish(WEBWORKER_SUPPORTED);
  }
}

@Component({
  selector: 'game',
  providers: [
    { provide: StockfishFactory, useClass: WebWorkerStockfishFactory },
    { provide: BoardDialogService, useClass: GameDialogService },
    ...CHESSJS_AI_CHESS_GAME_PROVIDERS
  ],
  styleUrls: [ 'game.component.scss' ],
  templateUrl: 'game.component.html'
})
export class GameComponent implements AfterViewInit, OnDestroy {
  aiLevels = [1,2,3,4,5,6,7,8,9,10];

  black: Player = new Player(PieceColor.BLACK, PlayerType.AI, 10);
  white: Player = new Player(PieceColor.WHITE, PlayerType.HUMAN, 10);

  workerSupported: boolean = typeof(Worker) !== "undefined";

  @ViewChild('board') private board: ChessBoard;
  @ViewChild('spinner') private spinner: TemplateRef<any>;

  isInit: boolean;

  ctrl: ChessBoardController;

  boardRect: BoardSizeChangeEvent = { height: 0, width: 0, clientHeight: 0, clientWidth: 0, xOffset: 0, yOffset: 0};

  isFF = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  constructor(private dialog: MdDialog) {}

  ngAfterViewInit() {
    this.ctrl = this.board.ctrl;

    this.ctrl.stateChanged.subscribe( state => {
      if(this.ctrl.isGameOver(state)) {
        this.board.blockUi(true);
        this.isInit = false;
      }
    });

    const ref = this.dialog.open(this.spinner, {disableClose: true});
    this.ctrl.init().then( () => ref.close() );
  }

  ngOnDestroy() {
    this.ctrl.destroy();
  }

  onBoardResize($event: BoardSizeChangeEvent): void {
    this.boardRect = $event;
  }

  onPlayerTypeChange(type: string, player: Player): void {
    this.ctrl.setPlayer(player.color, <any>PlayerType[type]);
  }

  onAILevelChange($event: MdSelectChange, player: Player): void {
    this.ctrl.setPlayer(player.color, player.type, player.aiIndex = $event.value);
  }

  onNewGame(): void {

    this.ctrl
      .setPlayer(this.black.color, this.black.type, this.black.aiIndex)
      .setPlayer(this.white.color, this.white.type, this.white.aiIndex)
      .newGame();

    this.isInit = true;
  }

  onStop(): void {
    this.ctrl.aiStop();
  }

  hint(): void {
    this.ctrl.aiNextMove().then( mv =>  this.ctrl.highlight(mv.to, mv.from) );
  }
}
