function LifeBar(ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "assets/img/Life-Bar.png";

    this.x = -10;
    this.y = this.ctx.canvas.height- 130;
    this.w = 566 / 2;
    this.h = 288 / 2;
  }

  LifeBar.prototype.animate = function() {
    this.alive = false; 
  };
  
  LifeBar.prototype.draw = function() {
    
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );  
  };

  function LifeProgress(ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "assets/img/Life-Bar2.png";

    this.img.frames = 10;
    this.img.frameIndex = 0;

    this.x = 82;
    this.y = this.ctx.canvas.height -  60;
    this.w = 140;
    this.h = 18;
  }

  LifeProgress.prototype.animate = function() {
    this.alive = false; 
  };
  
  LifeProgress.prototype.draw = function() {
    
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

    // this.ctx.drawImage(
    //   this.img,
    //   this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    //   0,
    //   this.img.width/ this.img.frames,
    //   this.img.height,
    //   0 - this.w / 2,
    //   0 - this.h / 2, 
    //   this.w,
    //   this.h
    // );


    // this.ctx.drawImage(
    //   this.img,
    //   0,
    //   this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    //   this.img.width/ this.img.frames,
    //   this.img.height,
    //   this.x,
    //   this.y, 
    //   this.w,
    //   this.h
    // );
  };



