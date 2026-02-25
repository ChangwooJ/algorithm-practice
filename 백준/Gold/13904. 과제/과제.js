const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);
const arr = [];

for (let i = 0; i < N; i++) {
  arr[i] = input[i + 1].split(" ").map(Number);
}

arr.sort((a, b) => b[1] - a[1]);

const list = Array.from({ length: 1001 }, () => 0);

for (let i = 0; i < N; i++) {
  let index = arr[i][0];
  if (list[index] === 0) {
    list[index] = arr[i][1];
  } else {
    while (index > 0) {
      index--;
      if (list[index] === 0) {
        list[index] = arr[i][1];
        break;
      }
    }
  }
}

let sum = 0;

for (let i = 1; i < 1001; i++) {
  sum += list[i];
}

console.log(sum);
