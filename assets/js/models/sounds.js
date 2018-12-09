function Sounds(){
  this.sounds = [
    'laser.mp3',
    'engine.mp3',
    'lifeBox.mp3',
    'bulletBox.mp3',
    'hot chocolate.mp3',
    'rock.mp3'
  ];
  this.sounds[4].loop = true;
  this.popSounds = [
    'pop1.mp3',
    'pop2.mp3',
    'pop3.mp3',
    'pop4.mp3',
    'pop5.mp3',
    'pop6.mp3'
  ];
  this.rockSounds = [
    'rock1.mp3',
    'rock2.mp3',
    'rock3.mp3',
    'rock4.mp3',
    'rock5.mp3'
  ];
}

Sounds.prototype.play = function(track){
  new Audio("assets/sounds/" + this.sounds[track]).play();
};
Sounds.prototype.playPop = function(track){
  new Audio("assets/sounds/" + this.popSounds[track]).play();
};
Sounds.prototype.playRock = function(track){
  new Audio("assets/sounds/" + this.rockSounds[track]).play();
};