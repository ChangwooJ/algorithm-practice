const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const S = Number(input[0]);

let num = S;

for (let i = 1; ; i++) {
  if (num < i) {
    console.log(i - 1);
    break;
  }
  num -= i;
}
