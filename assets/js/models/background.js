function Background(ctx) {
    this.ctx = ctx;

    this.x = 0;
    this.y = 0;
  
    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height;
  
    this.image = new Image ();
    this.image.src ="assets/img/Space-Background.jpg";
}

Background.prototype.draw = function() {
    this.ctx.drawImage (
        this.image, 
        this.x,
        this.y, 
        this.w, 
        this.h
      )
};

Background.prototype.move = function() {
};