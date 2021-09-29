import React from 'react';
import GomokuBackground from './GomokuBackground';
import type { PropsType as ParentPropsType } from './GomokuBackground';

export type PropsType = ParentPropsType;

export type CordPayload = {
  x: number;
  y: number;
};

export type PosPayload = {
  x: number;
  y: number;
};

export default class GomokuCanvas extends GomokuBackground {
  BOARD_START_POS = 1;
  BOARD_SPACE = 40;
  STONE_RADIUS = 18;

  drawBlackStone (payload: CordPayload) {
    this.boardContext.beginPath();
    this.boardContext.ellipse(
      payload.x * this.BOARD_SPACE + this.BOARD_START_POS,
      payload.y * this.BOARD_SPACE + this.BOARD_START_POS,
      this.STONE_RADIUS, this.STONE_RADIUS,
      0, 0, Math.PI * 2
    );
    this.boardContext.fillStyle = 'black';
    this.boardContext.fill();
    this.boardContext.closePath();
  }

  drawWhiteStone (payload: CordPayload) {
    this.boardContext.beginPath();
    this.boardContext.ellipse(
      payload.x * this.BOARD_SPACE + this.BOARD_START_POS,
      payload.y * this.BOARD_SPACE + this.BOARD_START_POS,
      this.STONE_RADIUS, this.STONE_RADIUS,
      0, 0, Math.PI * 2
    );
    this.boardContext.fillStyle = 'white';
    this.boardContext.fill();
    this.boardContext.closePath();
  }

  convertPosToCord (payload: PosPayload): CordPayload {
    return {
      x: Math.floor((payload.x - this.BOARD_START_POS) / this.BOARD_SPACE),
      y: Math.floor((payload.y - this.BOARD_START_POS) / this.BOARD_SPACE)
    }
  }
}
