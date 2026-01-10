const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [N, K] = input[0].split(" ").map(Number);

const arr = Array(100001).fill(false);

function bfs() {
  const queue = [N];
  arr[N] = true;

  let count = 0;

  while (queue.length > 0) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const node = queue.shift();

      if (node === K) {
        console.log(count);
        return;
      }

      for (const next of [node - 1, node + 1, node * 2]) {
        if (next >= 0 && next <= 100000 && !arr[next]) {
          arr[next] = true;
          queue.push(next);
        }
      }
    }

    count++;
  }
}

bfs();
