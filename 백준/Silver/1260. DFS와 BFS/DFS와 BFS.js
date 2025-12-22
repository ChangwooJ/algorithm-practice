const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [N, M, V] = input[0].split(" ").map(Number);
const adj = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i <= M; i++) {
    const [a, b] = input[i].split(" ").map(Number);
    adj[a].push(b);
    adj[b].push(a);
}

adj.forEach(line => line.sort((a, b) => a - b));

let dfsVisited = new Array(N + 1).fill(false);
let dfsResult = [];

function dfs(v) {
    dfsVisited[v] = true;
    dfsResult.push(v);
    for (let next of adj[v]) {
        if (!dfsVisited[next]) dfs(next);
    }
}
dfs(V);
console.log(dfsResult.join(" "));

let bfsVisited = new Array(N + 1).fill(false);
let bfsResult = [];
let queue = [V];
bfsVisited[V] = true;

while (queue.length > 0) {
    const v = queue.shift();
    bfsResult.push(v);

    for (let next of adj[v]) {
        if (!bfsVisited[next]) {
            bfsVisited[next] = true;
            queue.push(next);
        }
    }
}
console.log(bfsResult.join(" "));
