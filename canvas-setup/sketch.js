var particles = [];
var mini_particles = [];

function setup() {
  createCanvas(800, 600);

  for (var i = 0; i < 1; i++) {
    var radius = random(20, 60);
    particles.push(new Particle(random(radius, width - radius), 0, 60, 'white'));
  }

}

function draw() {
  background(51);

  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    if (particles[i].radius <= 0) {
      particles.splice(i, 1);
    }
  }

  for (var j = mini_particles.length - 1; j > 0; j--) {

    mini_particles[j].update();

    if (mini_particles[j].ttl <= 0) {
        mini_particles.splice(j, 1);
    }

  }

}

function MiniParticles(x, y, radius, particle_color) {

  this.x = x;
  this.y = y;
  this.radius = radius;
  this.particle_color = particle_color;
  this.gravity = 0.2;
  this.velocity = {
    x: random(-5, 5),
    y: random(-15, 15)
  };
  this.ttl = 100;


  this.render = function() {
    fill(this.particle_color);
    arc(this.x, this.y, this.radius, this.radius, 0, TWO_PI);
  }

  this.update = function() {
    this.render();

    if (this.y + (this.radius / 2) + this.velocity.y >= height) {
      this.velocity.y = -this.velocity.y * 0.6;
      this.radius -= 0.5;
    } else {
      this.velocity.y += this.gravity;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.ttl -= 1;

  }

}

function Particle(x, y, radius, particle_color) {

  this.x = x;
  this.y = y;
  this.radius = radius;
  this.particle_color = particle_color;
  this.gravity = 1;
  this.velocity = {
    x: random(-5, 5),
    y: random(-5, 5)
  };

  this.render = function() {
    fill(this.particle_color);
    arc(this.x, this.y, this.radius, this.radius, 0, TWO_PI);
  }

  this.update = function() {
    this.render();

    if (this.y + (this.radius / 2) + this.velocity.y >= height) {
      this.velocity.y = -this.velocity.y * 0.8;
      this.shatter();
    } else {
      this.velocity.y += this.gravity;
    }

    if (this.x + (this.radius / 2) + this.velocity.x > width || this.x - (this.radius / 2) <= 0) {
      this.velocity.x = -this.velocity.x;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;

  }

  this.shatter = function() {

    this.radius -= 5;

    for (var i = 0; i < 8; i++) {
      fill(this.particle_color);
      mini_particles.push(new MiniParticles(this.x, this.y, 4, this.particle_color));
    }

  }














}