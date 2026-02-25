const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);

const arr = [];

for (let i = 0; i < N; i++) {
  const [start, end] = input[i + 1].split(" ").map(Number);
  arr.push([start, 1]);
  arr.push([end, -1]);
}

arr.sort((a, b) => {
  if (a[0] === b[0]) {
    return a[1] - b[1];
  }
  return a[0] - b[0];
});

let max = 0;
let cur = 0;

for (let i = 0; i < arr.length; i++) {
  const [time, cal] = arr[i];
  cur += cal;

  if (cur > max) {
    max = cur;
  }
}

console.log(max);
