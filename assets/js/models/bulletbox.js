function BulletBox(ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "assets/img/BulletBox.png";

    this.x = Math.floor(Math.random() * this.ctx.canvas.width + 1);
    this.y = Math.floor(Math.random() * this.ctx.canvas.height + 1);
    this.w = 30;
    this.h = 30;

  }

  BulletBox.prototype.animate = function() {
  };
  
  BulletBox.prototype.draw = function() {
  
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y, 
      this.w,
      this.h
    );  

    };  

  BulletBox.prototype.move = function() {
  };