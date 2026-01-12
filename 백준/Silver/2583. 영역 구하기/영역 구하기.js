const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [M, N, K] = input[0].split(" ").map(Number);

const arr = Array.from({ length: M + 1 }, () => new Array(N + 1).fill(true));

for (let i = 0; i < K; i++) {
  const [x1, y1, x2, y2] = input[i + 1].split(" ").map(Number);
  for (let y = y1 + 1; y <= y2; y++) {
    for (let x = x1 + 1; x <= x2; x++) {
      arr[y][x] = false;
    }
  }
}

let count = 0;
const result = [];
const move = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
let size = 0;

function dfs([y, x]) {
  arr[y][x] = false;
  size++;

  for (let i = 0; i < 4; i++) {
    const [ny, nx] = [y + move[i][0], x + move[i][1]];
    if (ny > 0 && ny <= M && nx > 0 && nx <= N && arr[ny][nx]) {
      dfs([ny, nx]);
    }
  }
}

for (let i = 1; i <= M; i++) {
  for (let j = 1; j <= N; j++) {
    if (arr[i][j]) {
      size = 0;
      dfs([i, j]);
      result.push(size);
      count++;
    }
  }
}

console.log(count);
console.log(result.sort((a, b) => a - b).join(" "));
