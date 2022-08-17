(async () => {

    class game {

        #width = 10
        #height = 10

        #grid = []
        #elmGrid = []
        gridElm

        #crntPath = []
        #crntNabours = []
        #pathStarted = false
        #crntElm
        #crntX
        #crntY

        #number = 0
        #factors = []

        #nabourListner

        constructor(width, height) {
            this.#width = width ?? 10
            this.#height = height ?? 10
            var n = game.#numbs[Math.floor(Math.random() * game.#numbs.length)]
            this.#number = n.n
            this.#factors = n.f

            this.#gengrid()
            this.genElmGrid()
            this.#nabourListner = this.#nabourListnerN.bind(this)
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

        #minMax(min, x, max) {
            return Math.min(Math.max(x, min), max)
        }

        getNabouringCells(dx, dy) {
            console.log(dx, dy)
            var cells = []
            for (
                let x = Math.max(dx - 1, 0);
                x < Math.min(dx + 2, this.#width);
                x++
            ) {
                for (
                    let y = Math.max(dy - 1, 0);
                    y < Math.min(dy + 2, this.#height);
                    y++
                ) {
                    if ((x == dx) & (y == dy)) continue;
                    cells.push({
                        x: x,
                        y: y,
                        cell: this.#elmGrid[x]?.[y]
                    })
                }
            }
            return cells
        }

        beginPath(elm, x, y) {
            this.#crntX = x
            this.#crntY = y
            this.#crntElm = elm
            this.#pathStarted = true
            this.#crntPath.push(elm)
            this.#crntNabours = this.getNabouringCells(x, y)
            this.#crntNabours.forEach(t => {
                t.cell.style.background = 'yellow'
                t.cell.addEventListener('mousedown', this.#nabourListner)
            })
        }

        addPoint(elm, x, y) {
            console.log(this.#crntPath)
            this.#crntPath.push(this.#crntElm)
            this.#crntElm.style.background = 'green'
            this.#crntElm = elm
            this.#crntX = x
            this.#crntY = y
            console.log(this.#crntNabours.map(r => r.cell))
            this.#crntNabours.forEach(t => {
                t.cell.style.background = ''
                t.cell.removeEventListener('mousedown', this.#nabourListner)
            })
            this.#crntNabours = this.getNabouringCells(x, y).filter(t => !this.#crntPath.includes(t.cell))
            this.#crntNabours.forEach(t => {
                t.cell.style.background = 'yellow'
                t.cell.addEventListener('mousedown', this.#nabourListner)
            })
        }

        endPath() {

        }

        /**
         * @param {MouseEvent} e 
         */
        #nabourListnerN(e) {
            this.addPoint(
                e.target,
                e.target.getAttribute('x'),
                e.target.getAttribute('y')
            )
        }

        /**
         * 
         * @param {HTMLTableCellElement} elm 
         * @param {number} x 
         * @param {number} y 
         */
        #provideFunctionality(elm, x, y) {
            elm.addEventListener('mousedown', (() => {
                if (this.#pathStarted) return;
                this.beginPath(elm, x, y)
            }).bind(this))
        }

        genElmGrid() {
            this.#elmGrid = Array(this.#width).fill(undefined).map(t => new Array(this.#height));
            this.gridElm = document.createElement('div')
            for (let x = 0; x < this.#width; x++) {
                var row = document.createElement('tr')
                for (let y = 0; y < this.#height; y++) {
                    this.#elmGrid[x][y] = document.createElement('td')
                    this.#elmGrid[x][y].innerText = this.#grid[x][y]
                    this.#elmGrid[x][y].setAttribute('x', x)
                    this.#elmGrid[x][y].setAttribute('y', y)
                    row.appendChild(this.#elmGrid[x][y])
                    this.#provideFunctionality(this.#elmGrid[x][y], x, y)
                }
                this.gridElm.appendChild(row)
            }
            return this.gridElm
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
    var ssGame = new game()

    if (!document.readyState == 'compleate') await new Promise(r => document.addEventListener('DOMContentLoaded', r));

    document.body.appendChild(ssGame.gridElm)

})()