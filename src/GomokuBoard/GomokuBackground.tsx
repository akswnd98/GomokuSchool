import React from 'react';
import crossGridPng from '@/assets/cross_grid.png';
import { getImageFromUrl } from '@/src/ImageUtil';

export type PropsType = {

};

export default class GomokuBackground extends React.Component {
  boardCanvasRef: React.RefObject<HTMLCanvasElement>;

  boardCanvas!: HTMLCanvasElement;

  boardContext!: CanvasRenderingContext2D;

  constructor (props: PropsType) {
    super(props);
    this.boardCanvasRef = React.createRef<HTMLCanvasElement>();
  }

  async componentDidMount () {
    this.boardCanvas = this.boardCanvasRef.current!;
    this.boardContext = this.boardCanvas.getContext('2d')!;
    this.boardContext.drawImage(await getImageFromUrl(crossGridPng), 0, 0);
  }

  render () {
    return (
      <div>
        <canvas width={900} height={900} ref={this.boardCanvasRef}></canvas>
      </div>
    );
  }
}
