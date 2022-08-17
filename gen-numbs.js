const fs = require('fs')

var start = 1_000_000
var end = 15_000_000

function factors(n) {
    let arr = [];
    for (let i = 3; i < Math.floor(n / 2); i++) {
        if (n % i === 0) {
            arr.push(i);
        }
    }
    return arr;
}

var numbs = []

for (let i = start; i < end; i+=2) {
    var f = factors(i)
    if (f.length > 6) {
        numbs.push({
            n: i,
            f: f
        })
    }
}

fs.writeFileSync('assets/numbs.json', JSON.stringify(numbs))