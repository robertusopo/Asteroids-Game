window.onload = function() {
    var canvasElement = document.getElementById("canvas-game");
  
    new Game(canvasElement).start();
  }