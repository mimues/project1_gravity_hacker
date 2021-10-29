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
    frames: 100,
    keys: {
          ARROW_UP: "ArrowUp",
          ARROW_LEFT: "ArrowLeft",
          ARROW_DOWN: "ArrowDown",
          ARROW_RIGHT: "ArrowRight"
          },
    
  
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
      this.canvasSize.width = window.innerWidth
      this.canvasSize.height = window.innerHeight
  
      this.canvasDOM.setAttribute("width", this.canvasSize.width)
      this.canvasDOM.setAttribute("height", this.canvasSize.height)
    },

    start() {
      setInterval(() => {
  
        this.clearScreen()
        this.drawAll()
        this.moveAll()
  
      }, 1000 / this.frames)
    },

    drawAll() {
      this.drawPlayer()
    },

    drawPlayer() {
      this.player.draw()
    },

    moveAll() {
      this.movePlayer()
    },

    movePlayer() {
      this.player.move()
    },

    createAll() {
      this.createPlayer()
    },

    createPlayer() {
      this.player = new Player(this.ctx, this.canvasSize, this.canvasSize.width/2-25, this.canvasSize.height-100,this.canvasSize.height-100, 50, 100, 5)
    },

    setListeners() {
      document.onkeydown = e => {
        e.key === this.keys.ARROW_LEFT ? this.player.moveLeft() : null
        e.key === this.keys.ARROW_RIGHT ? this.player.moveRight() : null
        e.key === this.keys.ARROW_UP ? this.player.jump() : null
        e.key === this.keys.ARROW_DOWN ? this.player.moveDown() : null
      }
    },

    clearScreen() {
      this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
    },

}