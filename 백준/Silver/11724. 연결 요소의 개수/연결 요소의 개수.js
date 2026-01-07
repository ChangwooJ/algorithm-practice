const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [N, M] = input[0].split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i < M + 1; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

const visited = Array(N + 1).fill(false);
let count = 0;

function dfs(start) {
  visited[start] = true;

  for (const next of graph[start]) {
    if (!visited[next]) {
      dfs(next);
    }
  }
}

for (let i = 1; i < N + 1; i++) {
  if (!visited[i]) {
    count++;
    dfs(i);
  }
}

console.log(count);
