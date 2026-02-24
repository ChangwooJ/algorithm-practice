const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

let head = 0;

const T = Number(input[head++]);

for (let i = 0; i < T; i++) {
  const N = Number(input[head++]);
  const arr = [];
  for (let i = 0; i < N; i++) {
    arr[i] = input[head++].split(' ').map(Number);
  }

  arr.sort((a, b) => a[0] - b[0]);

  let count = N;
  let prevScore = arr[0][1];

  for (let i = 1; i < N; i++) {
    if (prevScore > arr[i][1]) {
      prevScore = arr[i][1];
    } else {
      count--;
    }
  }

  console.log(count);
}
