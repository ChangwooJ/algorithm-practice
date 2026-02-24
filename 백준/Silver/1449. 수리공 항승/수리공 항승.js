const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [N, L] = input[0].split(' ').map(Number);

const point = input[1].split(' ').map(Number);
point.sort((a, b) => a - b);

let start = 0;
let count = 0;

for (let i = 0; i < N; i++) {
  if (i !== start) {
    const length = point[i] - point[start];
    if (length + 1 > L) {
      start = i;
      count++;
    }
  }
}

count++;

console.log(count);
