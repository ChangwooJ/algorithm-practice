const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

let index = 0;
let T = Number(input[index++]);

for (let i = 0; i < T; i++) {
    const N = Number(input[index++]);
    const arr = input[index++].split(' ').map(Number);

    const adj = [0, ...arr];
    const visited = new Array(N + 1).fill(false);
    let count = 0;

    function dfs(node) {
        visited[node] = true;
        const next = adj[node];

        if (!visited[next]) {
            dfs(next);
        }
    }

    for (let j = 1; j <= N; j++) {
        if (!visited[j]) {
            dfs(j);
            count++;
        }
    }

    console.log(count);
}
