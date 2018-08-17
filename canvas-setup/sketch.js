var particle;

function setup() {
  createCanvas(800, 600);
  particle = new Particle(width/2, height/2, 30, 'white');
}

function draw() {
  background(51);
  particle.update();
}

function Particle(x, y, radius, particle_color) {

  this.x = x;
  this.y = y;
  this.radius = radius;
  this.particle_color = particle_color;

  this.render = function() {
    fill(this.particle_color);
    arc(mouseX, mouseY, this.radius, this.radius, 0, TWO_PI);
  }

  this.update = function() {
    this.render();
    
  }
  
}