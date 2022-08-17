(async () => {

    class game {

        #width = 10
        #height = 10

        #grid = []
        #attemptedPaths = []
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

        score = 0

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

        getNabouringCells(dx, dy) {
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
                        cell: this.#elmGrid[x][y]
                    })
                }
            }
            return cells
        }

        beginPath(elm, x, y) {
            this.#crntX = x
            this.#crntY = y
            this.#crntElm = elm
            this.#crntElm.style.background = 'green'
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
            this.#crntElm = elm
            this.#crntPath.push(this.#crntElm)
            this.#crntX = x
            this.#crntY = y
            this.#crntNabours.forEach(t => {
                t.cell.style.background = ''
                t.cell.removeEventListener('mousedown', this.#nabourListner)
            })
            this.#crntNabours = this.getNabouringCells(x, y).filter(t => !this.#crntPath.includes(t.cell))
            this.#crntNabours.forEach(t => {
                t.cell.style.background = 'yellow'
                t.cell.addEventListener('mousedown', this.#nabourListner)
            })
            this.#crntElm.style.background = 'green'
        }

        endPath() {
            var score = 0
            this.#crntNabours.forEach(t => {
                t.cell.style.background = ''
                t.cell.removeEventListener('mousedown', this.#nabourListner)
            })

            var path = this.#crntPath.map(t => Number(t.innerText)).sort((a, b) => a - b)

            if (
                (path.reduce((prev, crnt) => crnt * prev, 1) == this.#number) &
                (!this.#attemptedPaths.includes(path.join('-')))
            ) {
                this.score += this.#crntPath.reduce((crnt, prev) => {
                    prev.style.background = 'blue'
                    return (Math.ceil(Number(prev.innerText) / 25) + crnt)
                }, 0)
                this.#attemptedPaths.push(path.join('-'))
            } else {
                alert('Invalid Path')
                this.#crntPath.forEach((t) => {
                    t.style.background = ''
                })
            }

            console.log(score, this.#attemptedPaths)

            this.#crntNabours = []
            this.#crntPath = []
            this.#crntX = 0
            this.#crntY = 0
            this.#crntElm = undefined
            this.#pathStarted = false
        }

        /**
         * @param {MouseEvent} e 
         */
        #nabourListnerN(e) {
            var x = Number(e.target.getAttribute('x')),
                y = Number(e.target.getAttribute('y'))
            this.addPoint(
                this.#elmGrid[x][y],
                x, y
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
            this.gridElm = document.createElement('table')
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

        get number() { return this.#number }
        get attempts() { return this.#attemptedPaths }
    }

    await game.init()
    var ssGame = new game()
    globalThis.ssGame = ssGame
    var finish = document.createElement('button')
    var number = document.createElement('p')
    var score = document.createElement('p')

    finish.innerText = 'Finish Attempt'
    number.innerText = `Number: ${ssGame.number}`
    score.innerText = `Score: ${ssGame.score}`

    finish.addEventListener('click', () => {
        ssGame.endPath()
        score.innerText = `Score: ${ssGame.score}`
    })

    if (!document.readyState == 'compleate') await new Promise(r => document.addEventListener('DOMContentLoaded', r));

    document.body.appendChild(ssGame.gridElm)
    document.body.appendChild(finish)
    document.body.appendChild(number)
    document.body.appendChild(score)

})()