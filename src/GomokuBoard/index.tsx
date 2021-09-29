import React from 'react';
import GomokuCanvas from './GomokuCanvas';
import type { PropsType as ParentPropsType } from './GomokuCanvas';
import { checkEnd } from './Rules';

export type PropsType = {
  
} & ParentPropsType;

export default class GomokuBoard extends GomokuCanvas {
  boardState: Array<Array<number>> = Array(20).fill(0).map(() => Array(20).fill(0));

  checkEnd () {
    return checkEnd(this.boardState);
  }

  clearBoard () {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        this.boardState[i][j] = 0;
      }
    }
  }
}
