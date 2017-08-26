import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  NgZone
} from '@angular/core';

import { Piece, ChessEngine } from 'ngx-chess';
import { SVGChessBlock } from '../svg-chess-block/svg-chess-block.component';
import { PieceDragEvent} from '../svg-chess-board/svg-chess-board.component';

const scaleFactorNormal = 0.8;
const scaleFactorDrag = 0.9;
let scaleFactor = scaleFactorNormal;

@Component({
  selector: '[chess-piece]',
  templateUrl: 'svg-chess-piece.template.html',
  styleUrls: [ 'svg-chess-piece.styles.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SVGChessPiece {
  @Input() piece: Piece;

  // Drag&Drop is handled by the SVG document, which is the SVGChessBoard component.
  // We want the board component to know the components participating in the drag&drop (block/piece).
  // We can set an id attribute on the element then keep a hash of component instances and do a lookup.
  // We can also add data to the $event as the $event bubbles up...
  // But instead a piece/board component emits an event with when drag/drop happens.
  // The board component listens and knows who the participating components are.
  // Since the event's bubble, the order will always be piece -> board OR block -> board we will not
  // face race conditions.
  // However, the EventEmitter class is async by default which means that when we emit() the handler
  // on the board component will run AFTER the handler for the SVG root document mouseup/mousedown.
  // We must emit SYNC events so we the listener on ChesBoard component will get our message
  // before the event handler for the SVG document fires.
  @Output() pieceDrag: EventEmitter<PieceDragEvent> = new EventEmitter(false);

  x: number = 300;
  y: number = 300;
  pointerEvents: string = 'all';
  pieceFilter: string;

  get block(): SVGChessBlock {
    return this._block;
  }
  set block(value: SVGChessBlock) {
    if (this._block === value) return;
    this._block = value;
    if (value) {
      value.piece = this;
    }
  }
  private _block: SVGChessBlock;

  constructor(private game: ChessEngine, private cdr: ChangeDetectorRef, private zone: NgZone) {}

  onMousedown(event: MouseEvent) {
    this.pieceDrag.emit({
      piece: this,
      event
    });
  }

  dragStart() {
    // send the piece to the end so it will be top most svg element (mimic z-index)
    let idx = this.game.pieces.indexOf(this.piece);
    if (idx > -1) {
      this.game.pieces.push(this.game.pieces.splice(idx, 1)[0]);
    }

    this.pieceFilter = 'url(#pieceDropShadow)';
    this.pointerEvents = 'none';
    scaleFactor = scaleFactorDrag;
    this.cdr.markForCheck();
  }

  dragEnd() {
    this.pieceFilter = null;
    this.pointerEvents = 'all';
    scaleFactor = scaleFactorNormal;
    this.cdr.markForCheck();
  }

  setCoordinates(x: number, y: number) {
    this.x += x;
    this.y += y;
    // we trigger CD that in turn will invoke getTransform() (transform bind)
    // the CD run's on the current piece only, no where else.
    // TODO: explore performance diff when directly updating the DOM instead of CD triggering.
    this.cdr.markForCheck();
  }

  reset(animate?: number) {
    // TODO: move to angular animation when released.
    if (animate > 0) {
      let requestAnimationFrameID,
        start = {x: this.x, y: this.y};

      let animationStartTime = window.performance ? window.performance.now() : Date.now();

      this.zone.runOutsideAngular(() => {
        let doAnim = (ts) => {
          let progress =  (ts - animationStartTime) / animate;

          if (progress >= 1) {
            cancelAnimationFrame(requestAnimationFrameID);
            this.zone.run( () => this.reset());
            return;
          }

          this.x  = start.x + (this.block.x - start.x) * progress;
          this.y  = start.y + (this.block.y - start.y) * progress;

          this.zone.run( () => this.cdr.markForCheck());
          requestAnimationFrameID = requestAnimationFrame(doAnim);
        };
        requestAnimationFrameID = requestAnimationFrame(doAnim); // Start the loop.
      });
    }
    else {
      this.x = this.block.x;
      this.y = this.block.y;
      this.cdr.markForCheck();
    }
  }

  getTransform() {
    // The SVG's are 45x45, first lets make normalize from 45 to current size.
    let scale = this.block.size / 45;
    // the pad is applied on left & top, it will center the piece in the block.
    let pad = this.block.size *  ( (1-scaleFactor) / 2);

    scale *= scaleFactor;

    return `translate(${this.x + pad }, ${this.y + pad}) scale(${scale})`;
  }
}
