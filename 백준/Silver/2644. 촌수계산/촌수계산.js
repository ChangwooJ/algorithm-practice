const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const n = Number(input[0]);
const [a, b] = input[1].split(" ").map(Number);
const m = Number(input[2]);

const arr = Array.from({ length: n + 1 }, () => []);

for (let i = 1; i < m + 1; i++) {
  const [x, y] = input[i + 2].split(" ").map(Number);
  arr[x].push(y);
  arr[y].push(x);
}

const visited = Array.from({ length: n + 1 }, () => false);
const queue = Array.from({ length: n + 1 }, () => []);
let count = 1;

function bfs() {
  queue[count] = [a];
  visited[a] = true;

  while (queue[count].length > 0) {
    const now = queue[count].shift();

    if (now === b) {
      console.log(count);
      return;
    }

    for (let next of arr[now]) {
      if (arr[next].includes(b)) {
        console.log(count + 1);
        return;
      }

      if (!visited[next]) {
        queue[count + 1].push(next);
        visited[next] = true;
      }
    }

    if (queue[count].length === 0) {
      count++;
    }
  }

  console.log(-1);
}

bfs();
