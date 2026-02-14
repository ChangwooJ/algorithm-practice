const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [M, N] = input[0].split(' ').map(Number);

const arr = [];
for (let i = 0; i < M; i++) {
  arr[i] = input[i + 1].split(' ').map(Number);
}

const start = input[M + 1].split(' ').map(Number);
const end = input[M + 2].split(' ').map(Number);

const move = [
  [0, 0],
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function bfs() {
  const queue = [[start[0] - 1, start[1] - 1, start[2], 0]];
  const visited = Array.from({ length: M }, () =>
    Array.from({ length: N }, () => Array(5).fill(false)),
  );
  let head = 0;

  visited[start[0] - 1][start[1] - 1][start[2]] = true;

  while (head < queue.length) {
    const [y, x, d, dist] = queue[head++];

    if (y === end[0] - 1 && x === end[1] - 1 && d === end[2]) {
      console.log(dist);
      return;
    }

    for (let k = 1; k <= 3; k++) {
      const ny = y + move[d][0] * k;
      const nx = x + move[d][1] * k;

      if (ny < 0 || ny >= M || nx < 0 || nx >= N || arr[ny][nx] === 1) break;

      if (!visited[ny][nx][d]) {
        visited[ny][nx][d] = true;
        queue.push([ny, nx, d, dist + 1]);
      }
    }

    let turn = [];

    if (d === 1 || d === 2) {
      turn = [3, 4];
    } else turn = [1, 2];

    for (const nd of turn) {
      if (!visited[y][x][nd]) {
        visited[y][x][nd] = true;
        queue.push([y, x, nd, dist + 1]);
      }
    }
  }
}

bfs();
