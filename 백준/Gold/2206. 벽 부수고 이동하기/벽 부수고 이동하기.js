const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [N, M] = input[0].split(' ').map(Number);

const arr = [];
for (let i = 0; i < N; i++) {
  arr[i] = input[i + 1].split('').map(Number);
}

const move = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

function bfs() {
  const queue = [[0, 0, 0]];
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => Array(2).fill(false)),
  );
  const dist = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => Array(2).fill(false)),
  );
  let head = 0;

  visited[0][0][0] = true;
  dist[0][0][0] = 1;

  while (head < queue.length) {
    const [y, x, used] = queue[head++];

    if (y === N - 1 && x === M - 1) {
      console.log(dist[y][x][used]);
      return;
    }

    for (let i = 0; i < 4; i++) {
      const ny = y + move[i][0];
      const nx = x + move[i][1];

      if (ny >= 0 && ny < N && nx >= 0 && nx < M) {
        if (arr[ny][nx] === 1) {
          if (used === 0 && !visited[ny][nx][1]) {
            queue.push([ny, nx, 1]);
            visited[ny][nx][1] = true;
            dist[ny][nx][1] = dist[y][x][used] + 1;
          }
        } else {
          if (!visited[ny][nx][used]) {
            queue.push([ny, nx, used]);
            visited[ny][nx][used] = true;
            dist[ny][nx][used] = dist[y][x][used] + 1;
          }
        }
      }
    }
  }

  console.log(-1);
}

bfs();
