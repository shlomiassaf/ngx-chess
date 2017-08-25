import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'chess-board',
  template: `<canvas #canvas [attr.width]="width" [attr.height]="height"></canvas>`
})
export class ChessBoard implements AfterViewInit {
  @Input() height: number = 600;
  @Input() width: number = 600;
  @Input() rowCount: number = 8;
  @Input() columnCount: number = 8;
  @Input() blockColor1: string = '#debf83';
  @Input() blockColor2: string = '#fb0006';

  @ViewChild('canvas') private canvasElementRef: ElementRef;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private blockSize: number;

  constructor() {}

  ngAfterViewInit() {
    this.canvas = this.canvasElementRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.blockSize = this.canvas.height / this.rowCount;
    this.drawBoard();
  }

  drawBoard() {
    for(let colIdx = 0; colIdx < this.rowCount; colIdx++) {
      this.drawRow(colIdx);
    }
  
    // Draw outline
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(0, 0, this.rowCount * this.blockSize, this.columnCount * this.blockSize);
  }

  private drawRow(rowIdx: number) {
    for(let colIdx = 0; colIdx < this.columnCount; colIdx++) {
      this.drowBlock(rowIdx, colIdx);
    }
  }

  private drowBlock(rowIdx: number, colIdx: number) {
    // Set the background
    this.ctx.fillStyle = this.getBlockColor(rowIdx, colIdx);

    // Draw rectangle for the background
    this.ctx.fillRect(rowIdx * this.blockSize, colIdx * this.blockSize, this.blockSize, this.blockSize);

    this.ctx.stroke();
  }

  private getBlockColor(rowIdx: number, colIdx: number): string {
    let cStartColour;

    // Alternate the block colour
    if(rowIdx % 2)
      cStartColour = (colIdx % 2 ? this.blockColor1 : this.blockColor2);
    else
      cStartColour = (colIdx % 2? this.blockColor2 : this.blockColor1);

    return cStartColour;
  }
}
