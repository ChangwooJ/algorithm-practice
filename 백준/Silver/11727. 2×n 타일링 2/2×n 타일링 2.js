const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);

const dp = Array(n + 1).fill(0);

dp[1] = 1;
if(n >= 2) dp[2] = 3;

for(let i = 3; i <= n; i++) {
  dp[i] = (dp[i - 1] + 2 * dp[i - 2]) % 10007;
}

console.log(dp[n]);