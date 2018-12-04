function LifeBox(ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "assets/img/Life.png";

    this.x = Math.floor(Math.random() * this.ctx.canvas.width + 1);
    this.y = Math.floor(Math.random() * this.ctx.canvas.height + 1);
    this.w = 50;
    this.h = 50;

  }

  LifeBox.prototype.animate = function() {
  };
  
  LifeBox.prototype.draw = function() {
  
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y, 
      this.w,
      this.h
    );  

    };  

  LifeBox.prototype.move = function() {
  };