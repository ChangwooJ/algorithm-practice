const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const T = Number(input[0]);

function D(n) {
  return [(n * 2) % 10000, 'D'];
}

function S(n) {
  if (n === 0) return [9999, 'S'];
  return [n - 1, 'S'];
}

function L(n) {
  const d4 = n % 10;
  const d3 = Math.floor(n / 10) % 10;
  const d2 = Math.floor(n / 100) % 10;
  const d1 = Math.floor(n / 1000) % 10;

  return [d2 * 1000 + d3 * 100 + d4 * 10 + d1, 'L'];
}

function R(n) {
  const d4 = n % 10;
  const d3 = Math.floor(n / 10) % 10;
  const d2 = Math.floor(n / 100) % 10;
  const d1 = Math.floor(n / 1000) % 10;

  return [d4 * 1000 + d1 * 100 + d2 * 10 + d3, 'R'];
}

function bfs(a, b) {
  const visited = new Array(10000).fill(false);
  const queue = [[a, '']];
  let cur = 0;
  visited[a] = true;

  while (queue.length > cur) {
    const [node, path] = queue[cur++];

    const func = [D(node), S(node), L(node), R(node)];

    for (const next of func) {
      if (next[0] === b) {
        console.log(path + next[1]);
        return;
      }
      if (!visited[next[0]]) {
        visited[next[0]] = true;
        queue.push([next[0], path + next[1]]);
      }
    }
  }
}

for (let i = 0; i < T; i++) {
  const [a, b] = input[i + 1].split(' ').map(Number);
  bfs(a, b);
}
