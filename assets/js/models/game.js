function Game(canvasElement) {
    this.ctx = canvasElement.getContext("2d");

    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight -5;
  
    this.intervalId = undefined;

    this.bg = new Background(this.ctx);
    this.spaceship = new Player(this.ctx);
    this.lifeBar = new LifeBar(this.ctx);
    this.lifeProgress = new LifeProgress(this.ctx);
  
    this.bubbles = [];
    this.lifeBoxes = [];

    this.timer = 100;

    this.drawCount = 0;
    this.lifeCount = 0;
  }
  


  Game.prototype.start = function() {
    this.intervalId = setInterval(function() {

      this.clear();

      this.drawAll();

      this.moveAll();
      
      this.spaceship.bullets.forEach(function(bullet) {
        var BulletBubble = this.bulletCollision(bullet);
        if(BulletBubble) {
          console.log("colision bala")
          this.removeBubble(BulletBubble);
          var bulletIndex = this.spaceship.bullets.indexOf(BulletBubble);
          this.spaceship.bullets.splice(bulletIndex, 1);
        }
      }.bind(this));

      var ShipBubble = this.spaceshipCollision();
      if (ShipBubble) {
        console.log("colision nave")
        this.removeBubble(ShipBubble);
        
        this.spaceship.substractLives();
        this.updateLives();
      }

      var ShipLife= this.lifeCollision();
      if (ShipLife) {
        console.log("colision nave")
        this.removeLife(ShipLife);
        
        this.spaceship.addLives();
        this.updateLives();
      }

      if (this.spaceship.lives === 0) {
        this.gameOver();
      }

      //console.log(this.spaceship.lives);


    }.bind(this), DRAW_INTERVAL_MS);
  };
  
  Game.prototype.drawAll = function(action) {
    this.bg.draw();
    this.spaceship.draw();
    this.bubbles.forEach(function(bubble) {
      bubble.draw();
    });
    this.lifeBoxes.forEach(function(life) {
      life.draw();
    });

    this.drawCount++;
    this.lifeCount++;
  
    if (this.drawCount % this.timer === 0 ){
      this.addBubble();
      this.drawCount = 0; 
    }
    this.lifeProgress.draw();
    this.lifeBar.draw();

    if (this.lifeCount % 2200 === 0 ){
      this.addLifeBox();
      this.lifeCount = 0; 
    }
  };
  
  Game.prototype.moveAll = function(action) { 
    this.spaceship.move(); 
  };

  Game.prototype.addBubble = function () {
    var bubble = new Bubble(this.ctx);
    this.bubbles.push(bubble);
  };

  Game.prototype.addLifeBox = function () {
    var life = new LifeBox(this.ctx);
    console.log(this.lifeBoxes)
    this.lifeBoxes.push(life);
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

  Game.prototype.lifeCollision = function() {
    return this.lifeBoxes.find(function(life) {
      return this.spaceship.collisionDetect(life);
    }.bind(this));
  }

  Game.prototype.removeLife = function(life) {
      this.lifeBoxes = this.lifeBoxes.filter(function(b) {
        return b !== life;
      }.bind(this))
    };

  Game.prototype.removeBubble = function(bubble) {
    bubble.alive = false;
    setTimeout(function() {
      this.bubbles = this.bubbles.filter(function(b) {
        return b !== bubble;
      })
    }.bind(this), 300)
  }

  Game.prototype.updateLives = function () {
    
    if (this.spaceship.lives >= 135) {
      this.lifeProgress.img.frameIndex = 0
    } else if (this.spaceship.lives >= 120 ) {
      this.lifeProgress.img.frameIndex = 1
    } else if (this.spaceship.lives >= 105) {
      this.lifeProgress.img.frameIndex = 3 
    } else if (this.spaceship.lives >= 90) {
        this.lifeProgress.img.frameIndex = 4
    } else if (this.spaceship.lives >= 75) {
      this.lifeProgress.img.frameIndex = 5
    } else if (this.spaceship.lives >= 60) {
      this.lifeProgress.img.frameIndex = 6
    } else if (this.spaceship.lives >= 45) {
      this.lifeProgress.img.frameIndex = 7
    } else if (this.spaceship.lives >= 30) {
      this.lifeProgress.img.frameIndex = 8
    } else if (this.spaceship.lives <= 15) {
      this.lifeProgress.img.frameIndex = 9
    }
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

