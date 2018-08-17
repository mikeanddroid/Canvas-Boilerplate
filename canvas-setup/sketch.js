var particles = [];

function setup() {
  createCanvas(800, 600);

  for (var i = 0; i < 2; i++) {
    var radius = 60;
    particles.push(new Particle(random(radius, width / 2), height / 2, 60, 'white'));
  }

}

function draw() {
  background(51);

  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
  }
  
}

function Particle(x, y, radius, particle_color) {

  this.x = x;
  this.y = y;
  this.radius = radius;
  this.particle_color = particle_color;
  this.gravity = 1;
  this.velocity = {
    x: 0,
    y: random(-15, 15)
  };

  this.render = function() {
    fill(this.particle_color);
    arc(this.x, this.y, this.radius, this.radius, 0, TWO_PI);
  }

  this.update = function() {
    this.render();

    if (this.y + (this.radius / 2) + this.velocity.y >= height) {
      this.velocity.y = -this.velocity.y;
    } else {
      this.velocity.y += this.gravity;
    }

    this.y += this.velocity.y;

  }

}