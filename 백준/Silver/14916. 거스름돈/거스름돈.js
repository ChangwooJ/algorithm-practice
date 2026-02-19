const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const n = Number(input[0]);

let left = n;
let count = 0;

if (n === 1 || n === 3) {
  count = -1;
}

while (true && count !== -1) {
  if (left >= 5) {
    left -= 5;
    count++;
  } else if (left % 2 !== 0) {
    count--;
    left -= 1;
    count += 3;
  } else if (left % 2 === 0 && left >= 2) {
    left -= 2;
    count++;
  }
  if (left === 0) {
    break;
  }
}

console.log(count);
