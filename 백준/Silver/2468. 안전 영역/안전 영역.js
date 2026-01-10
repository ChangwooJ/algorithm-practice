const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const n = Number(input[0]);

const arr = [];

for (let i = 0; i < n; i++) {
  arr[i] = input[i + 1].split(" ").map(Number);
}

const move = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function dfs([x, y], height, visited) {
  visited[x][y] = true;

  for (let i = 0; i < 4; i++) {
    const nx = x + move[i][0];
    const ny = y + move[i][1];

    if (
      nx >= 0 &&
      nx < n &&
      ny >= 0 &&
      ny < n &&
      !visited[nx][ny] &&
      arr[nx][ny] > height
    ) {
      dfs([nx, ny], height, visited);
    }
  }
}

let maxCount = 1;

for (let height = 0; height <= 100; height++) {
  const visited = Array.from({ length: n }, () => Array(n).fill(false));
  let count = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && arr[i][j] > height) {
        dfs([i, j], height, visited);
        count++;
      }
    }
  }

  maxCount = Math.max(maxCount, count);
}

console.log(maxCount);
