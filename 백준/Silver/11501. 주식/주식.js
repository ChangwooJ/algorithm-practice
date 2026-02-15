const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

let head = 0;
const T = Number(input[head++]);

for (let i = 0; i < T; i++) {
  const N = Number(input[head++]);
  const arr = input[head++].split(' ').map(Number);

  let profit = 0;
  let high = 0;

  for (let j = N - 1; j >= 0; j--) {
    if (high < arr[j]) {
      high = arr[j];
    } else {
      profit += high - arr[j];
    }
  }

  console.log(profit);
}
