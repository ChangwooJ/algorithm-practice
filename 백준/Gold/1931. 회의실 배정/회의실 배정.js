const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);
const arr = [];

for (let i = 0; i < N; i++) {
  arr[i] = input[i + 1].split(" ").map(Number);
}

arr.sort((a, b) => {
  if (a[1] === b[1]) {
    return a[0] - b[0];
  }
  return a[1] - b[1];
});

let cur = arr[0][1];
let count = 1;

for (let i = 1; i < N; i++) {
  if (arr[i][0] >= cur) {
    count++;
    cur = arr[i][1];
  }
}

console.log(count);
