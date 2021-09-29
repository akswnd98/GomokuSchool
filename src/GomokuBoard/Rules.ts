const direction = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];

export function checkEnd (state: Array<Array<number>>) {
  let ret = false;
  direction.forEach((dir) => {
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        if (state[y][x] === 0) continue;
        const edge = [x, y].map((v, i) => v + dir[i] * 4);
        if (!edge.map((v) => v < 20 && v >= 0).reduce((prevVal, curVal) => prevVal && curVal)) continue;
        console.log(edge);
        if (checkLineEnd(state, [x, y], dir)) {
          ret = true;
          return;
        }
      }
    }
  })
  return ret;
}

function checkLineEnd (state: Array<Array<number>>, cord: Array<number>, dir: Array<number>) {
  let ret = true;
  for (let i = 0, j = 1; j < 5; i++, j++) {
    ret &&= (state[cord[1] + dir[1] * i][cord[0] + dir[0] * i] === state[cord[1] + dir[1] * j][cord[0] + dir[0] * j]);
  }
  return ret;
}
