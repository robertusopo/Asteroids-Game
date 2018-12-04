function Bubble(ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "assets/img/Bubble-Sprite.png";

    this.img.frames = 7;
    this.img.frameIndex = 0;

    this.x = Math.floor(Math.random() * this.ctx.canvas.width + 1);
    this.y = Math.floor(Math.random() * this.ctx.canvas.height + 1);
    this.w = 20;
    this.h = 20;

    this.vx = 0;
    this.vy = 0;

    this.f = 0.9;

    this.drawCount = 0;   
    this.deadCount = 0;
    this.alive = true; 
  }

  Bubble.prototype.animate = function() {
    this.alive = false; 
  };
  
  Bubble.prototype.draw = function() {
    
    this.drawCount++;
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

    if (this.drawCount % 10 === 0 ){
        this.w ++;
        this.h ++;

      }

    if(this.deadCount % 3 === 0 ) {
      if (!this.alive){
        this.img.frameIndex < 8 ? this.img.frameIndex++ : this.img.frameIndex = 0 }
    };

  Bubble.prototype.move = function() {
    this.y += this.vy;
    this.x += this.vx;
  
    if (this.y >= this.ctx.canvas.height - this.h) {
      this.y = this.ctx.canvas.height - this.h;
      this.vy = 0;
    }
    if (this.y <= 0) {
      this.y = 0;
      this.vy = 0;
    }
  
    if (this.x >= this.ctx.canvas.width - this.w) {
      this.x = this.ctx.canvas.width - this.w;
      this.vx = 0;
      
    }
  
    if (this.x <= 0) {
      this.x = 0;
      this.vx = 0;
    }
  };
  };