const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);
const arr = [[]];

for (let i = 1; i < N + 1; i++) {
  arr.push([0, ...input[i].split('').map(Number)]);
}

const visited = Array.from({ length: N + 1 }, () => []);
for (let i = 1; i < N + 1; i++) {
  visited[i] = Array(N + 1).fill(false);
}

const count = [];
let num = 0;

const move = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

function dfs([x, y]) {
  visited[x][y] = true;

  for (let i = 0; i < 4; i++) {
    const movedX = x + move[i][0];
    const movedY = y + move[i][1];

    if (
      movedX > 0 &&
      movedX <= N &&
      movedY > 0 &&
      movedY <= N &&
      !visited[movedX][movedY] &&
      arr[movedX][movedY] === 1
    ) {
      num++;
      dfs([movedX, movedY]);
    }
  }
}

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    if (!visited[i][j] && arr[i][j] === 1) {
      num = 1;
      dfs([i, j]);
      count.push(num);
    }
  }
}

console.log(count.length);
console.log(count.sort((a, b) => a - b).join('\n'));
