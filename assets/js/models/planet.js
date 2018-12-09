function Planet(ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "assets/img/planet-Sprite.png";

    this.img.frames = 7;
    this.img.frameIndex = 0;

    this.x = Math.floor(Math.random() * this.ctx.canvas.width + 1);
    this.y = Math.floor(Math.random() * this.ctx.canvas.height + 1);
    this.w = 120;
    this.h = 120;

    this.vx = (Math.random()*2) - 1;
    this.vy = (Math.random()*2) - 1;

    this.lives = 7;

    this.isTouched = false;

    this.drawCount = 0;   
    this.deadCount = 0;
    this.alive = true; 
  }

  Planet.prototype.animate = function() {
    this.alive = false; 
  };
  
  Planet.prototype.draw = function() {
    
    this.deadCount++;

    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
      0,
      this.img.width/ this.img.frames,
      this.img.height,
      this.x,
      this.y, 
      this.w,
      this.h
    );  

    if(this.deadCount % 3 === 0 ) {
      if (!this.alive){
        this.img.frameIndex < 9 ? this.img.frameIndex++ : this.img.frameIndex = 0 }
    };

  Planet.prototype.isTouched = function () {
    if (this.isTouched) {
      this.lives--;
      console.log(this.lives);
      this.img.frameIndex = 1;
      this.isTouched = false;
    }
  }
  
  Planet.prototype.move = function() {
    this.y += this.vy;
    this.x += this.vx;
  
    if (this.y >= this.ctx.canvas.height - this.h) {
      this.y = 0;
    } else if (this.y <= 0) {
      this.y = this.ctx.canvas.height - this.h;
    } else if (this.x >= this.ctx.canvas.width - this.w) {
      this.x = 0;
    } else if (this.x <= 0) {
      this.x = this.ctx.canvas.width - this.w;
    }
  };
  };