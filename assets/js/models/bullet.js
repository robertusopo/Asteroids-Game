function Bullet(ctx,x,y,angle) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "assets/img/bullet.png";
  
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 5;
  
    this.angle = angle;

    this.v = -25;
  
    
  }
  
  Bullet.prototype.draw = function() {
  
    this.ctx.save();

    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.angle);

    this.ctx.drawImage(
      this.img,
      -50,
      0, 
      this.w,
      this.h
    )
    this.ctx.restore();
  };
  
  Bullet.prototype.collisionDetect = function(object) {

    if (this.x  < object.x + object.w &&
        this.x + this.w > object.x &&
        this.y  < object.y + object.h &&
        this.h + this.y > object.y) {
      return true;
    };
  };
  
  Bullet.prototype.move = function() {

    //this.x += this.v;

    this.x += this.v * Math.cos(this.angle);
    this.y += this.v * Math.sin(this.angle);
  
  };
  