const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [R, C] = input[0].split(" ").map(Number);

const arr = [[]];
for (let i = 0; i < R; i++) {
  arr[i] = input[i + 1].split("");
}

const visited = {};
const move = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
let distance = 0;

function dfs(x, y, count) {
  distance = Math.max(distance, count);

  for (let i = 0; i < 4; i++) {
    const nx = x + move[i][0];
    const ny = y + move[i][1];

    if (
      nx >= 0 &&
      nx < R &&
      ny >= 0 &&
      ny < C &&
      visited[arr[nx][ny]] === undefined
    ) {
      visited[arr[nx][ny]] = true;
      dfs(nx, ny, count + 1);
      visited[arr[nx][ny]] = undefined;
    }
  }
}

visited[arr[0][0]] = true;
dfs(0, 0, 1);

console.log(distance);
