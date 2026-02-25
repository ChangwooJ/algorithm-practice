const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [N, K] = input[0].split(" ").map(Number);

const num = input[1].split("").map(Number);

const stack = [];

let deleteCount = 0;

for (let i = 0; i < N; i++) {
  while (
    stack.length > 0 &&
    stack[stack.length - 1] < num[i] &&
    deleteCount < K
  ) {
    stack.pop();
    deleteCount++;
  }

  stack.push(num[i]);
}

const result = stack.slice(0, N - K).join("");

console.log(result);
