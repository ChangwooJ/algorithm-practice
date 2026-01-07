const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const num = Number(input[0]);
const connect = Number(input[1]);

const graph = Array.from({ length: num + 1 }, () => []);

for (let i = 2; i < connect + 2; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

const visited = Array(num + 1).fill(false);
let count = 0;

function dfs(start) {
  visited[start] = true;

  for (const next of graph[start]) {
    if (!visited[next]) {
      count++;
      dfs(next);
    }
  }

  return count;
}

console.log(dfs(1));
