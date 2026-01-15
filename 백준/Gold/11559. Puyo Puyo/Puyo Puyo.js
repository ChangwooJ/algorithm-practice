const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split(/\r?\n/);

const arr = input.slice(0, 12).map((line) => line.split(""));
const move = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

let boom = 0;

function bfs(string, x, y, visited) {
  const queue = [[x, y]];
  const point = [[x, y]];
  visited[x][y] = true;

  let head = 0;

  while (head < queue.length) {
    const [x, y] = queue[head++];

    for (let i = 0; i < 4; i++) {
      const nx = x + move[i][0];
      const ny = y + move[i][1];

      if (
        nx >= 0 &&
        nx < 12 &&
        ny >= 0 &&
        ny < 6 &&
        arr[nx][ny] === string &&
        !visited[nx][ny]
      ) {
        visited[nx][ny] = true;
        queue.push([nx, ny]);
        point.push([nx, ny]);
      }
    }
  }
  return point;
}
/*
function dfs(string, x, y, point, visited) {
  visited[x][y] = true;
  point.push([x, y]);

  for (let i = 0; i < 4; i++) {
    const nx = x + move[i][0];
    const ny = y + move[i][1];

    if (
      nx >= 0 &&
      nx < 12 &&
      ny >= 0 &&
      ny < 6 &&
      arr[nx][ny] === string &&
      !visited[nx][ny]
    ) {
      dfs(string, nx, ny, point, visited);
    }
  }
}
*/
function process() {
  const visited = Array.from(Array(12), () => Array(6).fill(false));
  let flag = false;

  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 6; j++) {
      if (arr[i][j] !== "." && !visited[i][j]) {
        const point = bfs(arr[i][j], i, j, visited);

        if (point.length >= 4) {
          for (const p of point) {
            arr[p[0]][p[1]] = ".";
          }
          flag = true;
        }
      }
    }
  }

  return flag;
}

function sort() {
  for (let i = 0; i < 6; i++) {
    const temp = [];
    for (let j = 11; j >= 0; j--) {
      if (arr[j][i] !== ".") {
        temp.push(arr[j][i]);
        arr[j][i] = ".";
      }
    }
    for (let j = 0; j < temp.length; j++) {
      arr[11 - j][i] = temp[j];
    }
  }
}

while (true) {
  const flag = process();

  if (flag) {
    boom++;
  } else break;

  sort();
}

console.log(boom);
