class Player {
    constructor(ctx, canvasSize, posX, posY, initialY, width, height, speedY) {
      this.ctx = ctx
      this.canvasSize = canvasSize
  
      this.pos = {
        x: posX,
        y: posY,
        initialY: initialY
      }
  
      this.size = {
        width: width,
        height: height
      }
  
      this.speed = {
        y: speedY
      }
  
  
    //   this.frames = 3
    //   this.framesIndex = 0
  
    }
  
    draw() {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height)

      //ancho de un recorte this.imageInstance.width / this.frames
    //   this.ctx.drawImage(
    //     this.imageInstance,
    //     this.framesIndex * this.imageInstance.width / this.frames,  //inicio de recorte x
    //     0,                                                          //inicio de recorte y
    //     this.imageInstance.width / this.frames,                     //ancho de recorte
    //     this.imageInstance.height,                                  //alto de recorte
    //     this.pos.x,
    //     this.pos.y,
    //     this.size.width,
    //     this.size.height
    //   )
  
    //   if (framesCounter % 10 === 0) {
    //     this.animate()
    //   }
    }

    moveLeft() {
        if (this.pos.x > 0) {
            this.pos.x -= 30
        } else {
            null
        }
        }
    
    moveRight() {
        // A CAPÓN
        if (this.pos.x < this.canvasSize.width-this.size.width) {
            this.pos.x += 30
        } else {
            null
        }
        }
  
    // moveUp() {
    //     if (this.pos.y > 0) {
    //         this.pos.y -= 15
    //     } else {
    //         null
    //     }
    //     }

    moveDown() {
        // A CAPÓN
        if (this.pos.y < this.canvasSize.height-this.size.height) {
            this.pos.y += 15
        } else {
            null
        }
        }

    jump() {
        if (this.pos.y >= this.pos.initialY) {
            this.pos.y -= 30
            this.speed.y = -15
          }
        }

    move() {
        //Si no estás en el suelo cada vez caes más rápido
        if (this.pos.y < this.pos.initialY) {
            this.pos.y += this.speed.y
            this.speed.y += 0.6
        }
    }
    // animate() {
    //   if (this.framesIndex === 2) {
    //     this.framesIndex = 0
    //   }
    //   this.framesIndex++
    // }
  
    // jump() {
    //   //Si estás en el suelo saltas!
    //   if (this.pos.y >= this.pos.initialY) {
    //     this.pos.y -= 30
    //     this.speed.y = -15
    //   }
    // }
  
    // move() {
    //   //Si no estás en el suelo cada vez caes más rápido
    //   if (this.pos.y < this.pos.initialY) {
    //     this.pos.y += this.speed.y
    //     this.speed.y += 0.6
    //   }
    // }
  
    // shoot() {
    //   this.bullets.push(new Bullet(this.ctx, this.pos.x, this.pos.y, this.pos.initialY, this.size.width, this.size.height))
    // }
  
  
  }