const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);

const arr = [];
const island = Array.from({ length: N }, () => Array(N).fill(0));

for (let i = 0; i < N; i++) {
  arr[i] = input[i + 1].split(' ').map(Number);
}

const move = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const visited = Array.from({ length: N }, () => Array(N).fill(false));
const edge = Array.from({ length: N * N }, () => []);

let head = 1;

function dfs([x, y]) {
  visited[x][y] = true;
  island[x][y] = head;

  for (let i = 0; i < 4; i++) {
    const nx = x + move[i][0];
    const ny = y + move[i][1];

    if (nx >= 0 && nx < N && ny >= 0 && ny < N && !visited[nx][ny]) {
      if (arr[nx][ny] === 0) {
        edge[head].push([x, y]);
      } else {
        dfs([nx, ny]);
      }
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited[i][j] && arr[i][j] === 1) {
      dfs([i, j]);
      head++;
    }
  }
}

function bfs(num) {
  const queue = [];
  const dist = Array.from({ length: N }, () => Array(N).fill(-1));

  for (const [x, y] of edge[num]) {
    queue.push([x, y]);
    dist[x][y] = 0;
  }

  let qhead = 0;

  while (qhead < queue.length) {
    const [x, y] = queue[qhead++];

    for (let i = 0; i < 4; i++) {
      const nx = x + move[i][0];
      const ny = y + move[i][1];

      if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;

      if (arr[nx][ny] === 1 && island[nx][ny] !== num) {
        return dist[x][y];
      }

      if (arr[nx][ny] === 0 && dist[nx][ny] === -1) {
        dist[nx][ny] = dist[x][y] + 1;
        queue.push([nx, ny]);
      }
    }
  }
}

let minDistance = Infinity;
for (let i = 1; i < head; i++) {
  const res = bfs(i);
  if (res < minDistance) minDistance = res;
}

console.log(minDistance);
