const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);
const arr = [];

for (let i = 0; i < N; i++) {
  arr.push(Number(input[i + 1]));
}

let head = N;

for (let i = N - 1; i >= 0; i--) {
  if (arr[i] === head) {
    head--;
  }
}

console.log(head);
