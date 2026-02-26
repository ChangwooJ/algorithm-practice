const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const arr = [];

for (let i = 0; i < 19; i++) {
  arr[i] = input[i].split(" ").map(Number);
}

let black = 0;
let white = 0;

const move = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
];

function dfs(y, x, move) {
  if (arr[y][x] === 1) {
    black++;
  } else {
    white++;
  }

  const ny = y + move[0][0];
  const nx = x + move[0][1];
  if (ny >= 0 && nx >= 0 && ny < 19 && nx < 19 && arr[ny][nx] === arr[y][x]) {
    dfs(ny, nx, move);
  }
}

function find() {
  for (let i = 0; i < 19; i++) {
    for (let j = 0; j < 19; j++) {
      if (arr[i][j] !== 0) {
        for (let k = 0; k < 4; k++) {
          white = 1;
          black = 1;

          const ny = i + move[k][0];
          const nx = j + move[k][1];
          const py = i - move[k][0];
          const px = j - move[k][1];

          if (
            py >= 0 &&
            py < 19 &&
            px >= 0 &&
            px < 19 &&
            arr[py][px] === arr[i][j]
          ) {
            continue;
          }

          if (
            ny >= 0 &&
            ny < 19 &&
            nx >= 0 &&
            nx < 19 &&
            arr[ny][nx] === arr[i][j]
          ) {
            dfs(ny, nx, [move[k]]);

            if (white === 5 || black === 5) {
              console.log(arr[i][j]);
              console.log(i + 1, j + 1);
              return;
            }
          }
        }
      }
    }
  }

  console.log(0);
}

find();
