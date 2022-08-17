(async () => {

    class game {

        #width = 10
        #height = 10

        #grid = []
        #elmGrid

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

            var unfilledSquares = this.#width * this.#height

            this.#factors.forEach(t => {
                var poz = this.getRandomPosition(true)
                this.#grid[poz.x][poz.y] = t
                unfilledSquares--
            })

            while (unfilledSquares--) {
                var poz = this.getRandomPosition(true)
                this.#grid[poz.x][poz.y] = this.#factors[Math.floor(Math.random() * this.#factors.length)]
            }

            console.log(this.#grid)
        }

        genGrid() {
            for (let x = 0; x < array.length; x++) {
                for (let y = 0; y < array.length; y++) {
                }
            }
        }

        /**
         * 
         * @param {boolean} filtered 
         * @returns {{x:number,y:number}}
         */
        getRandomPosition(filtered) {
            var x = Math.floor(Math.random() * this.#height),
                y = Math.floor(Math.random() * this.#width);
            if (!filtered) {
                return {
                    x: x,
                    y: y
                }
            } else {
                while (this.#grid[x][y]) {
                    x = Math.floor(Math.random() * this.#height)
                    y = Math.floor(Math.random() * this.#width)
                }
                return {
                    x: x,
                    y: y
                }
            }

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