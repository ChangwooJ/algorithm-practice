const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [N, M] = input[0].split(' ').map(Number);
const arr = [[]];

for (let i = 1; i < N + 1; i++) {
  arr.push([0, ...input[i].split('').map(Number)]);
}

const visited = Array.from({ length: N + 1 }, () => []);
for (let i = 1; i < N + 1; i++) {
  visited[i] = Array(M + 1).fill(0);
}

function bfs() {
  const move = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const queue = [[1, 1]];
  visited[1][1] = 1;

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const [movedX, movedY] = move[i];

      if (
        x + movedX > 0 &&
        x + movedX <= N &&
        y + movedY > 0 &&
        y + movedY <= M
      ) {
        if (
          arr[x + movedX][y + movedY] === 1 &&
          visited[x + movedX][y + movedY] === 0
        ) {
          visited[x + movedX][y + movedY] = visited[x][y] + 1;
          queue.push([x + movedX, y + movedY]);
        }
      }
    }
  }

  console.log(visited[N][M]);
}

bfs();
