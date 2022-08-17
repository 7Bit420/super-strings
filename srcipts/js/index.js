(async () => {

    class game {

        #width = 10
        #height = 10

        #grid = []

        #number = 0
        #factors = []

        constructor(width, height) {
            this.#width = width ?? 10
            this.#height = height ?? 10
            var n = game.#numbs[Math.floor(Math.random() * game.#numbs.length)]
            this.#number = n.n
            this.#factors = n.f

            this.#gengrid()
        }

        #gengrid() {
            this.#grid = Array(this.#width).fill(undefined).map(t => new Array(this.#height));

            console.log(this.#number, this.#factors)
        }

        static #numbs = [{ n: 0, f: [0] }]
        static async init() {
            var req = new XMLHttpRequest()
            req.open('GET', 'assets/numbs.json')
            req.send()
            await new Promise(r => req.addEventListener('load', r))
            this.#numbs = JSON.parse(req.responseText)
        }
    }

    await game.init()
    new game()

})()