const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [N, M] = input[0].split(' ').map(Number);

const arr = [];
for (let i = 0; i < M; i++) {
  arr[i] = input[i + 1].split(' ').map(Number);
}

const boxArr = Array.from({ length: M }, () =>
  Array.from({ length: N }, () => []),
);

function nonWall(y, x, num) {
  let temp = num;
  for (let i = 0; i < 4; i++) {
    boxArr[y][x].push(temp % 2);
    temp = Math.floor(temp / 2);
  }
}

const visited = Array.from({ length: M }, () => Array(N).fill(false));
const roomNumber = Array.from({ length: M }, () => Array(N).fill(-1));
let index = 0;

const move = [
  [0, -1],
  [-1, 0],
  [0, 1],
  [1, 0],
];

function dfs([y, x]) {
  visited[y][x] = true;
  roomNumber[y][x] = index;

  let count = 1;

  for (let i = 0; i < 4; i++) {
    const ny = y + move[i][0];
    const nx = x + move[i][1];

    if (ny < 0 || ny >= M || nx < 0 || nx >= N) continue;

    if (!visited[ny][nx] && boxArr[y][x][i] === 0) {
      count += dfs([ny, nx]);
    }
  }

  return count;
}

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    nonWall(i, j, arr[i][j]);
  }
}

let room = 0;
let max = 0;
const roomSize = [];

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited[i][j]) {
      room++;
      const sizeCounter = dfs([i, j, 0]);
      roomSize.push(sizeCounter);
      max = Math.max(max, sizeCounter);
      index++;
    }
  }
}

const graph = Array.from({ length: index }, () => new Set());

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    const cur = roomNumber[i][j];

    for (let k = 0; k < 4; k++) {
      const ny = i + move[k][0];
      const nx = j + move[k][1];

      if (ny < 0 || ny >= M || nx < 0 || nx >= N) continue;

      if (cur !== roomNumber[ny][nx]) {
        graph[cur].add(roomNumber[ny][nx]);
        graph[roomNumber[ny][nx]].add(cur);
      }
    }
  }
}

let maxRoomSize = 0;

for (let i = 0; i < graph.length; i++) {
  for (const neighbor of graph[i]) {
    maxRoomSize = Math.max(maxRoomSize, roomSize[i] + roomSize[neighbor]);
  }
}

console.log(room);
console.log(max);
console.log(maxRoomSize);
