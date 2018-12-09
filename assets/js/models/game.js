function Game(canvasElement) {
    this.ctx = canvasElement.getContext("2d");

    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight -5;
  
    this.intervalId = undefined;

    this.bg = new Background(this.ctx);
    this.spaceship = new Player(this.ctx);
    this.lifeBar = new LifeBar(this.ctx);
    this.lifeProgress = new LifeProgress(this.ctx);
    this.sounds = new Sounds();

    this.score = 0;
  
    this.bubbles = [];
    this.lifeBoxes = [];
    this.bulletBoxes = [];
    this.planets = [];

    this.timer = 150;

    this.bubbleCount = 0;
    this.planetCount = 0;
    this.lifeCount = 0;
    this.bulletCount = 0;

    this.startPanel = document.getElementById('start-pannel');
    this.startPanel.style.width = this.ctx.canvas.width + 'px';
    this.startPanel.style.height = this.ctx.canvas.height + 'px';
    document.getElementById('start-btn').addEventListener('click', this.onClickStartBtn.bind(this))

    this.gameOverPannel = document.getElementById('gameover-pannel');
    this.gameOverPannel.style.width = this.ctx.canvas.width + 'px';
    this.gameOverPannel.style.height = this.ctx.canvas.height + 'px';
    document.getElementById('restart-btn').addEventListener('click', this.onClickRestartBtn.bind(this))

  }
  
  Game.prototype.onClickStartBtn = function() {
    this.startPanel.classList.add('hide');
    this.start();
  }

  Game.prototype.onClickRestartBtn = function() {
    location.reload();
    // this.gameOverPannel.classList.add('hide');
    // this.start();
  }

  Game.prototype.start = function() {
    this.sounds.play(4);
    this.intervalId = setInterval(function() {

      this.clear();

      this.drawAll();

      this.moveAll();
      
      this.spaceship.bullets.forEach(function(bullet) {
        var BulletBubble = this.bulletCollision(bullet);
        if(BulletBubble) {
          console.log("colision bala")
          this.score += 10;
          this.removeBubble(BulletBubble);
          var bulletIndex = this.spaceship.bullets.indexOf(BulletBubble);
          this.spaceship.bullets.splice(bulletIndex, 1);
        }
      }.bind(this));

      this.spaceship.bullets.forEach(function(bullet) {
        var BulletPlanet = this.bulletPlanetCollision(bullet);
        if(BulletPlanet) {
          console.log("colision bala")
          this.score += 20;
          var bulletIndex = this.spaceship.bullets.indexOf(BulletPlanet);
          this.spaceship.bullets.splice(bulletIndex, 1);

          this.removePlanet(BulletPlanet)
            
        }
      }.bind(this));

      var ShipBubble = this.spaceshipCollision();
      if (ShipBubble) {
        console.log("colision nave")
        this.removeBubble(ShipBubble);
        this.spaceship.substractLives();
        this.updateLives();
      }

      var shipPlanet = this.spaceshipPlanetCollision();
      if (shipPlanet) {
        console.log("colision nave")
        this.removePlanet(shipPlanet);
        this.spaceship.substractLives();
        this.updateLives();
      }

      var ShipLife = this.lifeCollision();
      if (ShipLife) {
        console.log("colision nave")
        this.sounds.play(2);
        this.removeLife(ShipLife);
        this.score -= 200;
        this.spaceship.addLives();
        this.updateLives();
      }

      var ShipBullet= this.bulletBCollision();
      if (ShipBullet) {
        console.log("colision nave")
        this.sounds.play(3);
        this.removeBulletB(ShipBullet);
        this.score -= 100;
        this.spaceship.shootBoost();
      }

      this.addPoints();
      console.log(this.score)

      if (this.spaceship.lives === 0) {
        this.gameOver();
      }

    }.bind(this), DRAW_INTERVAL_MS);
  };
  
  Game.prototype.drawAll = function(action) {
    this.bg.draw();
    this.spaceship.draw();
    this.bubbles.forEach(function(bubble) {
      bubble.draw();
      bubble.move();
    });

    this.planets.forEach(function(planet) {
      planet.draw();
      planet.move();
    });

    this.lifeBoxes.forEach(function(life) {
      life.draw();
    });

    this.bulletBoxes.forEach(function(bulletB) {
      bulletB.draw();
    });

    this.bubbleCount++;
    this.planetCount++;
    this.lifeCount++;
    this.bulletCount++;

    this.showScore();
  
    if (this.bubbleCount % this.timer === 0 ){
      this.addBubble();
      if(this.timer > 30){
        this.timer--;
        console.log(this.timer);
      }
      console.log(this.timer)
      this.bubbleCount = 0; 
    }

    if (this.planetCount % 2300 === 0 ){
      this.addPlanet();
      // this.planetCount = 0;
    }

    this.lifeProgress.draw();
    this.lifeBar.draw();

    if (this.lifeCount % 2200 === 0 ){
      this.addLifeBox();
      this.lifeCount = 0; 
    }
    if (this.bulletCount % 4000 === 0 ){
      this.addBulletBox();
      this.bulletCount = 0; 
    }
  };
  
  Game.prototype.moveAll = function(action) { 
    this.spaceship.move(); 
  };

  Game.prototype.addBubble = function () {
    var bubble = new Bubble(this.ctx);
    this.bubbles.push(bubble);
  };

  Game.prototype.addPlanet = function () {
    var planet = new Planet(this.ctx);
    this.planets.push(planet);
  };

  Game.prototype.addPoints = function () {
    if (this.lifeCount % 100 === 0 ){
      this.score += 10;
    }
  };

  Game.prototype.addLifeBox = function () {
    var life = new LifeBox(this.ctx);
    this.lifeBoxes.push(life);
  };

  Game.prototype.addBulletBox = function () {
    var bulletB = new BulletBox(this.ctx);
    this.bulletBoxes.push(bulletB);
  };
  
  Game.prototype.bulletCollision = function(bullet) {
    return this.bubbles.find(function(bubble) {
      return bullet.collisionDetect(bubble);
    }.bind(this)); 
  }
  
  Game.prototype.bulletPlanetCollision = function(bullet) {
    return this.planets.find(function(planet) {
      return bullet.collisionDetect(planet);
    }.bind(this)); 
  }

  Game.prototype.spaceshipCollision = function() {
    return this.bubbles.find(function(bubble) {
      return this.spaceship.collisionDetect(bubble);
    }.bind(this));
  }

  Game.prototype.spaceshipPlanetCollision = function() {
    return this.planets.find(function(planet) {
      return this.spaceship.collisionDetect(planet);
    }.bind(this));
  }

  Game.prototype.lifeCollision = function() {
    return this.lifeBoxes.find(function(life) {
      return this.spaceship.collisionDetect(life);
    }.bind(this));
  }

  Game.prototype.bulletBCollision = function() {
    return this.bulletBoxes.find(function(bulletB) {
      return this.spaceship.collisionDetect(bulletB);
    }.bind(this));
  }

  Game.prototype.removeLife = function(life) {
      this.lifeBoxes = this.lifeBoxes.filter(function(b) {
        return b !== life;
      }.bind(this))
    };

  Game.prototype.removeBulletB = function(bulletB) {
    this.bulletBoxes = this.bulletBoxes.filter(function(b) {
      return b !== bulletB;
    }.bind(this))
  };

  Game.prototype.removeBubble = function(bubble) {
    bubble.alive = false;
    setTimeout(function() {
      this.bubbles = this.bubbles.filter(function(b) {
        return b !== bubble;
      })
    }.bind(this), 300)
    this.sounds.playPop(Math.floor(Math.random() * this.sounds.popSounds.length));
  }

  Game.prototype.removePlanet = function(planet) {
    planet.lives--;
    planet.img.frameIndex++;
    this.sounds.playRock(Math.floor(Math.random() * this.sounds.popSounds.length));
    if (planet.lives === 0) {
      setTimeout(function() {
        this.planets = this.planets.filter(function(b) {
          return b !== planet;
        })
      }.bind(this), 0)
    }
  }

  Game.prototype.showScore = function () {
    this.ctx.fillStyle="rgb(255,255,255)";
    this.ctx.font="15px Arial";
    this.ctx.fillText("Score " + this.score, 85, this.ctx.canvas.height- 90); 
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
    this.gameOverPannel.classList.remove('hide');
    // if (confirm("GAME OVER! Play again?")) {
    //   location.reload();
    // }
  };

  Game.prototype.stop = function () { 
    clearInterval(this.intervalId);
    this.drawIntervalId = undefined;
  }
  
  Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  };

