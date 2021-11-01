const game = {
    title: 'Gravity Hack',
    author: 'Jesus & Miguel',
    license: undefined,
    version: '1.0.0',
    description: 'BE Spiderman',
    canvasDOM: undefined,
    ctx: undefined,
    canvasSize: { width: undefined, height: undefined },
    player: undefined,
    frames: 60,
    keys: {
          ARROW_UP: "ArrowUp",
          ARROW_LEFT: "ArrowLeft",
          ARROW_DOWN: "ArrowDown",
          ARROW_RIGHT: "ArrowRight",
          KEY_S: "s",
          KEY_A: "a",
          KEY_W: "w",
          KEY_D: "d"
          },
    gravity: "DOWN",
    
  
    init() {
      this.setContext()
      this.setDimensions()
      this.setListeners()
      this.createAll()
      
      this.start()

    },
  
    setContext() {
      this.canvasDOM = document.querySelector("#myCanvas")
      this.ctx = this.canvasDOM.getContext("2d")
    },

    setDimensions() {
      //OJO!!! he puesto innerHeight en el width para que sea un cuadrado
      this.canvasSize.width = 600
      this.canvasSize.height = 600
  
      this.canvasDOM.setAttribute("width", this.canvasSize.width)
      this.canvasDOM.setAttribute("height", this.canvasSize.height)
    },

    start() {
      setInterval(() => {
  
        this.clearScreen()
        this.drawAll()
        this.gravityAll()
        // this.ctx.restore()
      }, 1000 / this.frames)
    },

    drawAll() {
      this.drawPlayer()
    },

    drawPlayer() {
      this.player.draw()
    },

    gravityAll() {
      this.gravityPlayer()
    },

    gravityPlayer() {
      this.player.acceleration(this.gravity)
    },

    createAll() {
      this.createPlayer()
    },

    createPlayer() {
      this.player = new Player(this.ctx, this.canvasSize, this.canvasSize.width/2-25, this.canvasSize.height-100, 50, 100)
    },

    setListeners() {
      document.onkeydown = e => {
        e.key === this.keys.ARROW_LEFT ? this.player.moveLeft(this.gravity) : null
        e.key === this.keys.ARROW_RIGHT ? this.player.moveRight(this.gravity) : null
        e.key === this.keys.ARROW_UP ? this.player.moveUp(this.gravity) : null
        e.key === this.keys.ARROW_DOWN ? this.player.moveDown(this.gravity) : null
        if (e.key === this.keys.KEY_S) {
          this.gravity = "DOWN"
          this.player.gravitySwitch = true
        }
        if (e.key === this.keys.KEY_A) {
          this.gravity = "LEFT"
          this.player.gravitySwitch = true
        }
        if (e.key === this.keys.KEY_W) {
          this.gravity = "UP"
          this.player.gravitySwitch = true
        }
        if (e.key === this.keys.KEY_D) {
          this.gravity = "RIGHT"
          this.player.gravitySwitch = true
        }
      }
    },

    clearScreen() {
      this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
    },

}