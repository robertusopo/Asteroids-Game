function Player(ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "assets/img/spaceship-Sprite.png";

    this.img.frames = 2;
    this.img.frameIndex = 0;

    this.x = this.ctx.canvas.width / 2;
    this.y = this.ctx.canvas.height / 2;
    this.w = 40;
    this.h = 50;

    this.angle = 0;
    this.v = 0;

    this.lives = 150;

    this.drawCount = 0;

    this.setListeners();

    this.movinUp = false;
    this.movingRight = false;
    this.movingLeft = false;
    this.shooting = false;

    this.bullets = [];
  };
  
  Player.prototype.draw = function() {
    
    this.drawCount++;

    // if (this.drawCount % 1 === 0) {
    //   this.drawCount = 0;
    //   if (this.shooting) { this.addBullet() }
    // } 
    if(this.bullets < 5) {
      if (this.shooting) { this.addBullet() }
    };

    this.ctx.save();

    this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
    this.ctx.rotate(this.angle - Math.PI / 2);

    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
      0,
      this.img.width/ this.img.frames,
      this.img.height,
      0 - this.w / 2,
      0 - this.h / 2, 
      this.w,
      this.h
    );

    this.ctx.restore();

    this.bullets.forEach(function(bullet) {
      bullet.draw();
    });

    this.bullets = this.bullets.filter(function(bullet) {
      return bullet.x <= this.ctx.canvas.width && bullet.x > 0 && bullet.y > 0 && bullet.y <= this.ctx.canvas.height;
    }.bind(this));

  };

  Player.prototype.setListeners = function () {
    document.onkeyup = this.onKeyUp.bind(this);
    document.onkeydown = this.onKeyDown.bind(this);
  }
  
  
  Player.prototype.move = function() {
    if (this.movingRight) { this.angle += (Math.PI / 32) }
    if (this.movingLeft) { this.angle -= (Math.PI / 32) }
    if (this.movingUp) {
      this.img.frameIndex = 1;
      if (this.v > -5) {
        this.v += -SPEED_MOVE;
      } else {
        this.v = - 5;
      } 
    }
    this.x += this.v * Math.cos(this.angle);
    this.y += this.v * Math.sin(this.angle);
  
    if (this.y >= this.ctx.canvas.height - this.h) {
      this.y = 0;
      // this.v = 0;
    } else if (this.y <= 0) {
      this.y = this.ctx.canvas.height - this.h;
      // this.v = 0;
    } else if (this.x >= this.ctx.canvas.width - this.w) {
      this.x = 0;
      // this.v = 0;
    } else if (this.x <= 0) {
      this.x = this.ctx.canvas.width - this.w;
      // this.v = 0;
    }

    this.v = this.v * FRICTION;
  
    this.bullets.forEach(function(bullet) {
      bullet.move();
    });

  };
  
  Player.prototype.animate = function() {
  };
  
  Player.prototype.collisionDetect = function(object) {
    var coll =  (
      this.x < object.x + object.w &&
      this.x + this.w > object.x &&
      this.y < object.y + object.h &&
      this.y + this.h > object.y
    )

    // this.ctx.beginPath();
    // this.ctx.strokeStyle="yellow";
    // this.ctx.moveTo(object.x,0);
    // this.ctx.lineTo(object.x,999999);
    // this.ctx.moveTo(0,object.y);
    // this.ctx.lineTo(9999999,object.y);
    // this.ctx.stroke();
    // this.ctx.strokeRect(object.x,object.y,object.w,object.h);

    // this.ctx.beginPath();
    // this.ctx.strokeStyle="#FF0000";
    // this.ctx.moveTo(this.x,0);
    // this.ctx.lineTo(this.x,999999);
    // this.ctx.moveTo(0,this.y);
    // this.ctx.lineTo(9999999,this.y);
    // this.ctx.stroke();
    // this.ctx.strokeRect(this.x,this.y,this.w,this.h);


    return coll;
  };

  Player.prototype.substractLives = function () {
    this.lives -=  2; 
    }

  Player.prototype.addBullet = function () {
    var bullet = new Bullet(this.ctx, this.x + this.w / 2, this.y + this.h / 2, this.angle);
    this.bullets.push(bullet);
  }
  
  Player.prototype.onKeyDown = function(event) {

    switch (event.keyCode) {
      case KEY_DOWN:
      this.img.frameIndex = 0;
      break;
      case KEY_UP:
      this.movingUp = true;
        break;
      case KEY_RIGHT:
        this.movingRight = true
        break;
      case KEY_LEFT:
      this.movingLeft = true
        break;
      case KEY_SPACE:
      // this.addBullet()
       this.shooting = true;
        break;
    }
  };
  
  Player.prototype.onKeyUp = function(event) {
    this.img.frameIndex = 0;
    switch (event.keyCode) {
      case KEY_DOWN:
      case KEY_UP:
      this.movingUp = false
      case KEY_RIGHT:
        this.movingRight = false
        break;
      case KEY_LEFT:
        this.movingLeft = false;
        break;
      case KEY_SPACE:
        this.shooting = false;
    }



  };