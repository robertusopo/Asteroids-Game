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
  
  Bullet.prototype.collisionDetect = function(o) {

    var colX = this.x + this.w > o.x && this.x + this.w < o.x + o.w + this.w;
    var colY = this.y + this.h> o.y && this.y + this.h < o.y + o.h + this.h;

  // console.log(o)
  //  console.log("colX",colX);
  //  console.log("colY",colY);
  //  console.log(o);
  return colX && colY;
  };
  
  
  Bullet.prototype.move = function() {

    //this.x += this.v;

    this.x += this.v * Math.cos(this.angle);
    this.y += this.v * Math.sin(this.angle);
  
  };
  