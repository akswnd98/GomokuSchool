import React from 'react';
import GomokuBoard, { PropsType as ParentPropsType } from '@/src/GomokuBoard';
import { CordPayload } from '../GomokuBoard/GomokuCanvas';
import * as tf from '@tensorflow/tfjs';

type PropsType = ParentPropsType;

export default class GomokuBoardHumanVsAi extends GomokuBoard {
  whiteModel!: tf.GraphModel;

  constructor (props: PropsType) {
    super(props);
  }

  async componentDidMount () {
    await super.componentDidMount();

    if ('indexedDB' in window) {
      try {
        this.whiteModel = await tf.loadGraphModel('indexeddb://white_model');
      } catch (err) {
        this.whiteModel = await tf.loadGraphModel('/models/white_model.json');
        await this.whiteModel.save('indexeddb://white_model');
      }
    }

    this.boardCanvas.addEventListener('click', async (e) => {
      const humanCord = this.convertPosToCord(e);
      if (this.boardState[humanCord.y][humanCord.x] !== 0) return;
      this.processHumanDecision(humanCord);

      if (this.checkEnd()) alert('end');

      const aiCord = await this.getAiDecision();
      this.processAiDecision(aiCord);

      if (this.checkEnd()) alert('end');
    });
  }

  processHumanDecision (cord: CordPayload) {
    this.drawBlackStone(cord);
    this.boardState[cord.y][cord.x] = 1;
  }

  processAiDecision (cord: CordPayload) {
    this.drawWhiteStone(cord);
    this.boardState[cord.y][cord.x] = -1;
  }

  async getAiDecision () {
    let input = tf.tensor(this.boardState, [20, 20], 'float32');
    input = tf.reshape(input, [1, 20, 20, 1]);
    const tensor = this.whiteModel.predict(input) as tf.Tensor<tf.Rank>;
    const arr = Array.from((await tensor.data()) as Float32Array);
    const pair = arr.map((v, i) => [v, i]);
    const sorted = pair.sort((a, b) => b[0] - a[0]);
    for (let i = 0; i < sorted.length; i++) {
      if (this.boardState[Math.floor(sorted[i][1] / 20)][sorted[i][1] % 20] === 0) {
        return {
          x: sorted[i][1] % 20,
          y: Math.floor(sorted[i][1] / 20)
        };
      }
    }
    return { x: -1, y: -1 };
  }
}
