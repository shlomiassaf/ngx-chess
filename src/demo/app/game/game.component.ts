import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MdSidenav, MdRadioChange } from '@angular/material';

import { Stockfish } from 'es6-stockfish';
import { ChessBoard, ChessBoardController, PieceColor, PlayerType } from 'ngx-chess';
import { CHESSJS_AI_CHESS_GAME_PROVIDERS, StockfishFactory } from 'ngx-chess/plugins/chessjs-ai';
import { getStockfish } from './fishwrap.shared';

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
    ...CHESSJS_AI_CHESS_GAME_PROVIDERS
  ],
  styleUrls: [ 'game.component.scss' ],
  templateUrl: 'game.component.html'
})
export class GameComponent implements AfterViewInit, OnDestroy {
  aiLevels = [1,2,3,4,5,6,7,8,9,10];

  black: Player = new Player(PieceColor.BLACK, PlayerType.AI, 9);
  white: Player = new Player(PieceColor.WHITE, PlayerType.HUMAN, 9);

  workerSupported: boolean = typeof(Worker) !== "undefined";

  @ViewChild('sidenav') private sidenav: MdSidenav;
  @ViewChild('board') private board: ChessBoard;

  isInit: boolean;

  ctrl: ChessBoardController;


  constructor() {}

  ngAfterViewInit() {
    this.ctrl = this.board.ctrl;
    this.ctrl.init()
      .then( () => this.sidenav.toggle(true) );

  }

  ngOnDestroy() {
    this.ctrl.destroy();
  }

  onPlayerTypeChange(event: MdRadioChange, player: Player): void {
    this.ctrl.setPlayer(player.color, <any>PlayerType[event.value]);
  }

  onAILevelChange($event: Event, player: Player): void {
    player.aiIndex = Number( (<any>$event.srcElement).selectedIndex);
    this.ctrl.setPlayer(player.color, player.type, this.getLevel(player.aiIndex));
  }

  onNewGame(): void {
    this.ctrl
      .setPlayer(this.black.color, this.black.type, this.getLevel(this.black.aiIndex))
      .setPlayer(this.white.color, this.white.type, this.getLevel(this.white.aiIndex))
      .newGame();

    this.isInit = true;
  }

  onStop(): void {
    this.ctrl.aiStop();
  }

  hint(): void {
    this.ctrl.aiNextMove().then( mv =>  this.ctrl.highlight(mv.to, mv.from) );
  }

  private getLevel(idx: number): number {
    return this.aiLevels[idx];
  }
}
