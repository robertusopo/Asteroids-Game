function Game(canvasElement) {
    this.ctx = canvasElement.getContext("2d");

    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight -5;
  
    this.intervalId = undefined;

    this.bg = new Background(this.ctx);
    this.spaceship = new Player(this.ctx);
  
    this.bubbles = [];

    this.lives = 5;

    this.timer = 100;

    this.drawCount = 0;
  }
  


  Game.prototype.start = function() {
    this.intervalId = setInterval(function() {
      this.clear();
      this.drawAll();
      
      this.spaceship.bullets.forEach(function(bullet) {
        var BulletBubble = this.bulletCollision(bullet);
        if(BulletBubble) {
          console.log("colision bala")
          this.removeBubble(BulletBubble);

        }
      }.bind(this));
      var ShipBubble = this.spaceshipCollision();
      if (ShipBubble) {
        console.log("colision nave")
        this.removeBubble(ShipBubble);
        this.substractLives();
      }

      if (this.lives === 0) {
        this.gameOver();
      }
      console.log(this.lives);
      this.moveAll();
    }.bind(this), DRAW_INTERVAL_MS);
  };
  
  Game.prototype.drawAll = function(action) {
    this.bg.draw();
    this.spaceship.draw();
    this.bubbles.forEach(function(bubble) {
      bubble.draw();
    });

    this.drawCount++;

    if (this.drawCount % this.timer === 0 ){
      this.timer--;
      this.addBubble();
      this.drawCount = 0; 
    }
  };
  
  Game.prototype.moveAll = function(action) { 
    this.spaceship.move(); 
  };

  Game.prototype.addBubble = function () {
    var bubble = new Bubble(this.ctx);
    this.bubbles.push(bubble);
  };
  
  Game.prototype.bulletCollision = function(bullet) {
    return this.bubbles.find(function(bubble) {
      return bullet.collisionDetect(bubble);
    }.bind(this)); 
  }

  Game.prototype.spaceshipCollision = function() {
    return this.bubbles.find(function(bubble) {
      return this.spaceship.collisionDetect(bubble);
    }.bind(this));
  }

  Game.prototype.removeBubble = function(bubble) {
    bubble.alive = false;
    setTimeout(function() {
      this.bubbles = this.bubbles.filter(function(b) {
        return b !== bubble;
      })
    }.bind(this), 300)
  }

  Game.prototype.substractLives = function () {
  this.lives--; 
  }
  
  Game.prototype.gameOver = function() {
    clearInterval(this.intervalId);

    if (confirm("GAME OVER! Play again?")) {
      location.reload();
    }
  };

  Game.prototype.stop = function () { 
    clearInterval(this.intervalId);
    this.drawIntervalId = undefined;
  }
  
  Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  };