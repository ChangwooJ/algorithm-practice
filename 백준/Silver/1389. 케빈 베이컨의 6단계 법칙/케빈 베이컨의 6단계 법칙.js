const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [N, M] = input[0].split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

const result = Array.from({ length: N + 1 }).fill(0);

function bfs(start) {
  const arr = Array.from({ length: N + 1 }).fill(0);
  const visited = new Array(N + 1).fill(false);
  const queue = [start];

  visited[start] = true;

  while (queue.length > 0) {
    const node = queue.shift();

    for (const next of graph[node]) {
      if (!visited[next]) {
        arr[next] = arr[node] + 1;
        visited[next] = true;
        queue.push(next);
      }
    }
  }

  for (let i = 1; i <= N; i++) {
    result[start] += arr[i];
  }
}

for (let i = 1; i <= N; i++) {
  bfs(i);
}

let min = Infinity;
let minNum = 0;

for (let i = 1; i <= N; i++) {
  if (result[i] < min) {
    min = result[i];
    minNum = i;
  }
}

console.log(minNum);
