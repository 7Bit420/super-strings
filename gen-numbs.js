const fs = require('fs')

var start = 50
var end = 3000

function factors(n) {
    let arr = [];
    for (let i = 3; i < n; i++) {
        if (n % i === 0) {
            arr.push(i);
        }
    }
    return arr;
}

var numbs = []

for (let i = start; i < end; i++) {
    var f = factors(i)
    if (f.length > 6) {
        numbs.push({
            n: i,
            f: f
        })
    }
}

fs.writeFileSync('assets/numbs.json', JSON.stringify(numbs))