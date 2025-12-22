const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [A, P] = input[0].split(" ").map(Number);
const arr = [A];

function squared(num) {
    let number = num;
    let sum = 0;

    while (number > 0) {
        const digit = number % 10;
        sum += digit ** P;
        number = Math.floor(number / 10);
    }

    return sum;
}

while (true) {
    const lastNum = arr[arr.length - 1];
    const result = squared(lastNum);

    if (arr.includes(result)) {
        console.log(arr.indexOf(result));
        break;
    } else {
        arr.push(result);
    }
}
