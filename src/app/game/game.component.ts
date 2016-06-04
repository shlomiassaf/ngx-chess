import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MdSidenav } from '@angular2-material/sidenav/sidenav';
import { MdRadioChange } from '@angular2-material/radio/radio';

import { ChessBoard, ChessBoardController, PieceColor, PlayerType, BaseBlock } from 'ng2-chess';
import { DOM_SVG_KIT_DIRECTIVES } from '../../packages/ng2-chess/plugins/ui/dom-svg-board';
import { CHESSJS_AI_CHESS_GAME_PROVIDERS } from '../../packages/ng2-chess/plugins/game/chessjs-ai';

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

@Component({
  selector: 'game',
  providers: [ ...CHESSJS_AI_CHESS_GAME_PROVIDERS ],
  directives: [ ...DOM_SVG_KIT_DIRECTIVES ],
  pipes: [ ],
  styles: [ require('./game.css') ],
  template: require('./game.html')
})
export class Game implements AfterViewInit {
  aiLevels = [1,2,3,4,5,6,7,8,9,10];

  black: Player = new Player(PieceColor.BLACK, PlayerType.AI, 9);
  white: Player = new Player(PieceColor.WHITE, PlayerType.HUMAN, 9);

  workerSupported: boolean = typeof(Worker) !== "undefined";
  
  @ViewChild('sidenav') private sidenav: MdSidenav;
  @ViewChild('board') private board: ChessBoard;

  isInit: boolean;

  private ctrl: ChessBoardController;

  
  constructor() {}

  ngAfterViewInit() {
    this.ctrl = this.board.ctrl;
    this.ctrl.init()
      .then( () => this.sidenav.toggle(true) );

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
