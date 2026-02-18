const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const S = input[0].split("").map(Number);

let one = 0;
let zero = 0;

if (S[0] === 0) zero++;
else one++;

for (let i = 1; i < S.length; i++) {
  if (S[i] !== S[i - 1]) {
    if (S[i] === 0) zero++;
    else one++;
  }
}

console.log(Math.min(one, zero));
