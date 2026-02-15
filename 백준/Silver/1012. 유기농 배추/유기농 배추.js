const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

let head = 0;
const T = Number(input[head++]);

const move = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

for (let i = 0; i < T; i++) {
  const [M, N, K] = input[head++].split(' ').map(Number);

  const arr = Array.from({ length: N }, () => Array(M).fill(0));
  for (let j = 0; j < K; j++) {
    const [x, y] = input[head++].split(' ').map(Number);
    arr[y][x] = 1;
  }

  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  let count = 0;

  function bfs([x, y]) {
    const queue = [[x, y]];
    visited[y][x] = true;
    let qhead = 0;

    while (qhead < queue.length) {
      const [curX, curY] = queue[qhead++];
      for (let i = 0; i < 4; i++) {
        const nx = curX + move[i][0];
        const ny = curY + move[i][1];

        if (nx < 0 || nx >= M || ny < 0 || ny >= N || visited[ny][nx]) continue;

        if (arr[ny][nx] === 1) {
          queue.push([nx, ny]);
          visited[ny][nx] = true;
        }
      }
    }
  }

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (!visited[y][x] && arr[y][x] === 1) {
        bfs([x, y]);
        count++;
      }
    }
  }

  console.log(count);
}
