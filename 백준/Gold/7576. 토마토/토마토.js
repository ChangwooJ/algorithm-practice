const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [M, N] = input[0].split(' ').map(Number);
const arr = Array.from({ length: N }, () => []);
for (let i = 1; i < N + 1; i++) {
  arr[i - 1] = input[i].split(' ').map(Number);
}

const move = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

function bfs() {
  const queue = [];
  let cur = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (arr[i][j] === 1) {
        queue.push([i, j]);
      }
    }
  }

  while (queue.length > cur) {
    const [cx, cy] = queue[cur++];

    for (let i = 0; i < 4; i++) {
      const nx = cx + move[i][0];
      const ny = cy + move[i][1];

      if (nx >= 0 && ny >= 0 && nx < N && ny < M && arr[nx][ny] === 0) {
        arr[nx][ny] = arr[cx][cy] + 1;
        queue.push([nx, ny]);
      }
    }
  }
}

bfs();

let count = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (arr[i][j] === 0) {
      console.log(-1);
      return;
    }
    count = Math.max(count, arr[i][j]);
  }
}

if (count === 0) {
  console.log(count);
} else {
  console.log(count - 1);
}
