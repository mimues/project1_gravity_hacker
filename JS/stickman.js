class Player {
    constructor(ctx, canvasSize, posX, posY, width, height) {
      this.ctx = ctx
      this.canvasSize = canvasSize
  
      this.pos = {
        x: posX,
        y: posY,
        initialYDown: this.canvasSize.height-100,
        initialYUp: 0,
        initialXLeft: 0,
        initialXRight:this.canvasSize.width-50

      }
  
      this.size = {
        width: width,
        height: height
      }
  
      this.speed = {
        x: 0,
        y: 0
      }

      this.gravitySwitch = false
      
  
    //   this.frames = 3
    //   this.framesIndex = 0
  
    }
  
    draw() {
        // this.ctx.save()
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

    // changeGravityLeft() {
    //     this.rotateLeft()
    // }

    // rotateLeft() {
        
    //     // this.ctx.fillStyle = "red";
    //     // this.ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height)
    //     this.ctx.translate(this.canvasSize.width/2, this.canvasSize.height/2);
    //     this.ctx.rotate(Math.PI / 2);
    //     this.ctx.translate(-(this.canvasSize.width/2), -(this.canvasSize.height/2));
    //     // this.draw()
    //     // this.ctx.restore()
    //     // this.canvasSize.width = window.innerHeight
    //     // this.canvasSize.height = window.innerHeight
    //     // this.pos.initialY = this.canvasSize.width - this.size.height
    //     // console.log(this.pos.initialY)
    // }

    // changeGravityLeft() 
        
    // }

    moveLeft(gravity) {
        if (gravity === "DOWN" || gravity === "UP") {
            if (this.pos.x > 0) {
                this.pos.x -= 30
            } else {
                null
            }
        } else if (gravity === "LEFT") {
            if (this.pos.x > 0) {
                this.pos.x -= 30
            } else {
                null
            }
        } else if (gravity === "RIGHT") {
            if (this.pos.x >= this.pos.initialXRight) {
                this.pos.x -= 30
                this.speed.x = -15
            }
        }
    }
    
    moveRight(gravity) {
        // A CAPÓN
        if (gravity === "DOWN" || gravity === "UP") {
            if (this.pos.x + this.size.width < this.canvasSize.width) {
                this.pos.x += 30
            } else {
                null
            }
        } else if (gravity === "LEFT") {
            if (this.pos.x <= this.pos.initialXLeft) {
                this.pos.x += 30
                this.speed.x = 15
                
            }
        } 
    }
  
    // moveUp() {
    //     if (this.pos.y > 0) {
    //         this.pos.y -= 15
    //     } else {
    //         null
    //     }
    //     }

    moveDown(gravity) {
        // A CAPÓN
        if (gravity === "DOWN") {
            if (this.pos.y + this.size.height < this.canvasSize.height) {
                this.pos.y += 30
            } else {
                null
            }
        } else if (gravity === "LEFT" || gravity === "RIGHT") {
            if (this.pos.y + this.size.height < this.canvasSize.height) {
                this.pos.y += 30
            } else {
                null
            }
        } else if (gravity === "UP") {
            if (this.pos.y <= this.pos.initialYUp) {
                this.pos.y += 30
                this.speed.y = 15
            }
        }
    }

    moveUp(gravity) {
        if (gravity === "DOWN") {
            console.log(this.speed.y);
            if (this.pos.y >= this.pos.initialYDown) {
                this.pos.y -= 30
                this.speed.y = -15
            }
        } else if (gravity === "LEFT" || gravity === "RIGHT") {
            if (this.pos.y > 0) {
                this.pos.y -= 30
            } else {
                null
            // } else if (gravity === "UP") {
            //     if (this.pos.y > 0) {
            //         this.pos.y -= 30
            //     } else {
            //         null
            //     }
            // }
            }
        }
    }
    acceleration(gravity) {
        //Si no estás en el suelo cada vez caes más rápido
        if (gravity === "DOWN") {
            //ESTÁ CAYENDO
            if (this.pos.y < this.pos.initialYDown) {
                //Si cae hacía el otro lado, se resetea la vel
                if(this.speed.y < 0 && this.gravitySwitch) {
                    this.speed.y = 0
                    this.gravitySwitch = false
                }
                this.pos.y += this.speed.y
                this.speed.y += 0.6
            } else {
                //ESTÁ TOCANDO EL SUELO, LO FIJAMOS AL SUELO PARA EVITAR DESAJUSTES VISUALES
                this.pos.y = this.pos.initialYDown
                //Reseteamos velocidad para no acumular
                this.speed = {x: 0, y: 0}
                this.gravitySwitch = false
            }    
        } else if (gravity === "LEFT") {
            if (this.pos.x > this.pos.initialXLeft) {
                if(this.speed.x > 0 && this.gravitySwitch) {
                    this.speed.x = 0
                    this.gravitySwitch = false
                }
                this.pos.x += this.speed.x
                this.speed.x -= 0.6
            } else {
                this.pos.x = this.pos.initialXLeft
                this.speed = {x: 0, y: 0}
                this.gravitySwitch = false
            }
        } else if (gravity === "UP") {
            if (this.pos.y > this.pos.initialYUp) {
                if(this.speed.y > 0 && this.gravitySwitch) {
                    this.speed.y = 0
                    this.gravitySwitch = false
                }
                this.pos.y += this.speed.y
                this.speed.y -= 0.6
            } else {
                this.pos.y = this.pos.initialYUp
                this.speed = {x: 0, y: 0}
                this.gravitySwitch = false
            }
        } else if (gravity === "RIGHT") {
            if (this.pos.x < this.pos.initialXRight) {
                if(this.speed.x < 0 && this.gravitySwitch) {
                    this.speed.x = 0
                    this.gravitySwitch = false
                }
                this.pos.x += this.speed.x
                this.speed.x += 0.6
            } else {
                this.pos.x = this.pos.initialXRight
                this.speed = {x: 0, y: 0}
                this.gravitySwitch = false
            }
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