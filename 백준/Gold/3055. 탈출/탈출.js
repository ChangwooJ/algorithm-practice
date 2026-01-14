const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [R, C] = input[0].split(" ").map(Number);

const arr = [[]];
for (let i = 0; i < R; i++) {
  arr[i] = input[i + 1].split("");
}

const move = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const queue1 = [];
const queue2 = [];

function bfs() {
  let time = 0;
  let cur1 = 0;
  let cur2 = 0;

  while (queue2.length > cur2) {
    time++;

    const loop1 = queue1.length - cur1;
    const loop2 = queue2.length - cur2;
    for (let i = 0; i < loop1; i++) {
      const x = queue1[cur1][0];
      const y = queue1[cur1][1];
      cur1++;

      for (let i = 0; i < 4; i++) {
        const nx = x + move[i][0];
        const ny = y + move[i][1];

        if (nx >= 0 && nx < R && ny >= 0 && ny < C && arr[nx][ny] === ".") {
          queue1.push([nx, ny]);
          arr[nx][ny] = "*";
        }
      }
    }

    for (let i = 0; i < loop2; i++) {
      const x2 = queue2[cur2][0];
      const y2 = queue2[cur2][1];
      cur2++;

      for (let i = 0; i < 4; i++) {
        const nx2 = x2 + move[i][0];
        const ny2 = y2 + move[i][1];

        if (nx2 >= 0 && nx2 < R && ny2 >= 0 && ny2 < C) {
          if (arr[nx2][ny2] === ".") {
            queue2.push([nx2, ny2]);
            arr[nx2][ny2] = "S";
          }
          if (arr[nx2][ny2] === "D") {
            console.log(time);
            return;
          }
        }
      }
    }
  }
  console.log("KAKTUS");
}

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (arr[i][j] === "*") queue1.push([i, j]);
  }
}

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (arr[i][j] === "S") queue2.push([i, j]);
  }
}

bfs();
