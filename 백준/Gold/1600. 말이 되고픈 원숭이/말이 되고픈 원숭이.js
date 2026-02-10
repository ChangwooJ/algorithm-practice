const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const K = Number(input[0]);

const [W, H] = input[1].split(' ').map(Number);

const arr = [];

for (let i = 0; i < H; i++) {
  arr[i] = input[i + 2].split(' ').map(Number);
}

const horesMove = [
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
];

const normalMove = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

function bfs() {
  if (W === 1 && H === 1) return 0;

  const distance = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => new Array(K + 1).fill(-1)),
  );
  const queue = [[0, 0, 0]];
  let head = 0;

  distance[0][0][0] = 0;

  while (head < queue.length) {
    const [y, x, z] = queue[head++];

    for (let i = 0; i < 4; i++) {
      const nx = x + normalMove[i][0];
      const ny = y + normalMove[i][1];

      if (
        nx >= 0 &&
        nx < W &&
        ny >= 0 &&
        ny < H &&
        arr[ny][nx] === 0 &&
        distance[ny][nx][z] === -1
      ) {
        distance[ny][nx][z] = distance[y][x][z] + 1;
        if (nx === W - 1 && ny === H - 1) {
          return distance[ny][nx][z];
        }
        queue.push([ny, nx, z]);
      }
    }

    if (z < K) {
      for (let i = 0; i < 8; i++) {
        const nx = x + horesMove[i][0];
        const ny = y + horesMove[i][1];

        if (
          nx >= 0 &&
          nx < W &&
          ny >= 0 &&
          ny < H &&
          arr[ny][nx] === 0 &&
          distance[ny][nx][z + 1] === -1
        ) {
          distance[ny][nx][z + 1] = distance[y][x][z] + 1;
          if (nx === W - 1 && ny === H - 1) {
            return distance[ny][nx][z + 1];
          }
          queue.push([ny, nx, z + 1]);
        }
      }
    }
  }
  return -1;
}

console.log(bfs());
