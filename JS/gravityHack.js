const game = {
  title: 'Gravity Hack',
  author: 'Jesus & Miguel',
  license: undefined,
  version: '1.0.0',
  description: 'BE an apple and hit Newton with your gravity',
  canvasDOM: undefined,
  ctx: undefined,
  canvasSize: { width: undefined, height: undefined },
  player: undefined,
  frames: 60,
  intervalId: undefined,
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
  floors: [],
  lavas: [],
  newton: undefined,
  

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
    //OJO!!!  cuadrado
    this.canvasSize.width = 600
    this.canvasSize.height = 600

    this.canvasDOM.setAttribute("width", this.canvasSize.width)
    this.canvasDOM.setAttribute("height", this.canvasSize.height)
  },

  start() {
    this.intervalId = setInterval(() => {

      this.clearScreen()
      this.drawAll()
      this.gravityAll()

      if (this.isLava() || this.isFalling()) {
        this.gameOver()
      }
      if (this.isHittingNewton()) {
        this.youWin()
      }
    }, 1000 / this.frames)
  },

  drawAll() {
    this.drawNewton()
    this.drawLava()
    this.drawFloor()
    this.drawPlayer()
  },

  drawPlayer() {
    this.player.draw()
  },

  drawFloor() {
    this.floors.forEach(elem => elem.draw())
  },

  drawLava() {
    this.lavas.forEach(elem => elem.draw())
  },

  drawNewton() {
    this.newton.draw()
  },

  gravityAll() {
    this.gravityPlayer()
  },

  gravityPlayer() {
    this.player.acceleration(this.gravity)
  },

  createAll() {
    this.createNewton()
    this.createLava()
    this.createFloor()
    this.createPlayer()
  },

  createPlayer() {
    this.player = new Player(this.ctx, this.canvasSize, this.canvasSize.width/2-20, this.canvasSize.height-100, 40, 40, this.floors)
  },

  createFloor() {
    this.floors.push(new Floor(this.ctx, this.canvasSize, 100, this.canvasSize.height-20, 400, 10))
    this.floors.push(new Floor(this.ctx, this.canvasSize, 10, 100, 10, 400))
    this.floors.push(new Floor(this.ctx, this.canvasSize, 100, 10, 400, 10))
    this.floors.push(new Floor(this.ctx, this.canvasSize, this.canvasSize.width-20, 100, 10, 400))
  },

  createLava(){
    // this.lavas.push(new Lava(this.ctx, this.canvasSize, this.canvasSize.width, this.canvasSize.height, this.canvasSize.width/2, this.canvasSize.height/2, 5))
    this.lavas.push(new Lava(this.ctx, this.canvasSize, this.canvasSize.width/2-2.5, 100, 5, 200))
    this.lavas.push(new Lava(this.ctx, this.canvasSize, 100, this.canvasSize.height/2-2.5, 200, 5))
    this.lavas.push(new Lava(this.ctx, this.canvasSize, 300, this.canvasSize.height/2-2.5, 50, 5))
    this.lavas.push(new Lava(this.ctx, this.canvasSize, 350, this.canvasSize.height/2-2.5, 5, 50))
    this.lavas.push(new Lava(this.ctx, this.canvasSize, 350, this.canvasSize.height/2+47.5, 50, 5))
    this.lavas.push(new Lava(this.ctx, this.canvasSize, 400, this.canvasSize.height/2+47.5, 5, 50))
    this.lavas.push(new Lava(this.ctx, this.canvasSize, 400, this.canvasSize.height/2+97.5, 50, 5))
    this.lavas.push(new Lava(this.ctx, this.canvasSize, 450, this.canvasSize.height/2+97.5, 5, 50))
    this.lavas.push(new Lava(this.ctx, this.canvasSize, 450, this.canvasSize.height/2+147.5, 50, 5))
    this.lavas.push(new Lava(this.ctx, this.canvasSize, 500, this.canvasSize.height/2+147.5, 5, 50))
    this.lavas.push(new Lava(this.ctx, this.canvasSize, 500, this.canvasSize.height/2+197.5, 50, 5))
    this.lavas.push(new Lava(this.ctx, this.canvasSize, 550, this.canvasSize.height/2+197.5, 5, 50))
    this.lavas.push(new Lava(this.ctx, this.canvasSize, 550, this.canvasSize.height/2+247.5, 50, 5))
  },

  createNewton() {
    this.newton = new Newton(this.ctx, this.canvasSize, 525, 400, 60, 60)
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
        this.player.framesIndex = 0
      }
      if (e.key === this.keys.KEY_A) {
        this.gravity = "LEFT"
        this.player.gravitySwitch = true
        this.player.framesIndex = 1
      }
      if (e.key === this.keys.KEY_W) {
        this.gravity = "UP"
        this.player.gravitySwitch = true
        this.player.framesIndex = 2
      }
      if (e.key === this.keys.KEY_D) {
        this.gravity = "RIGHT"
        this.player.gravitySwitch = true
        this.player.framesIndex = 3
      }
    }
  },

  isLava() {
    return this.lavas.some(elem => {
      return (
        this.player.pos.x + this.player.size.width > elem.pos.x &&  //lado drch del player lado izq del obs
        this.player.pos.x < elem.pos.x + elem.size.width &&         //lado izq del player lado drch del elem
        this.player.pos.y + this.player.size.height > elem.pos.y && //lado de abajo del player lado de arriba del obs
        this.player.pos.y < elem.pos.y + elem.size.height           //lado de arriba del player lado de abajo del obs
      )
    })
  },

  isFalling() {
    if (this.player.pos.x < -50 || 
      this.player.pos.x > this.canvasSize.width+50 ||
      this.player.pos.y < -50 ||
      this.player.pos.y > this.canvasSize.height+50) {
        return true
      }
  },

  isHittingNewton() {
    return (
      this.player.pos.x + this.player.size.width > this.newton.pos.x &&  //lado drch del player lado izq del obs
      this.player.pos.x < this.newton.pos.x + this.newton.size.width &&         //lado izq del player lado drch del this.newton
      this.player.pos.y + this.player.size.height > this.newton.pos.y && //lado de abajo del player lado de arriba del obs
      this.player.pos.y < this.newton.pos.y + this.newton.size.height           //lado de arriba del player lado de abajo del obs
    )
  },

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
  },

  gameOver() {
    clearInterval(this.intervalId)
  },

  youWin() {
    clearInterval(this.intervalId)
    this.ctx.fillStyle = "purple";
        this.ctx.fillRect(0, 0, 300, 300)
  }

}