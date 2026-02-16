const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);
const P = input[1].split(" ").map(Number);

P.sort((a, b) => a - b);

let num = 0;
let result = 0;

for (let i = 0; i < P.length; i++) {
  num += P[i];
  result += num;
}

console.log(result);
