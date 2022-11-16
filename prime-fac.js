var primes = []

var start = 311_000
var end = 5_000_000
for (let i = 3; i < end; i++) {
    valid = true
    for (let n = 4; n < Math.sqrt(i); n++) {
        if (i % n == 0) { valid = false; break }
    }
    if (valid) { primes.push(i) }
}

console.log('init')

function genNmbers() {
    function factors(n) {
        let arr = [];
        for (let i = 3; i < Math.floor(n / 2); i++) {
            if (n % i === 0) {
                arr.push(i);
            }
        }
        return arr.filter(t => primes.includes(t));
    }

    var streak = []

    for (let i = start; i < end; i += 2) {
        var f = factors(i)
        if (f.length == 4) {
            streak.push({n:i,f:f})
        } else {
            streak = []
        }
        if (streak.length==4) {
            console.log(streak)
        }
    }
}


genNmbers()