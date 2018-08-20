var centerY;
var centerX;
var offset; // How far you want the animation to happen
var speed; // How fast you want the angle to change
var angle = 0; // Initial starting angle

var particle, particle2;

function setup() {
  createCanvas(800, 600);
  centerY = height / 2;
  centerX = width / 2;
  offset = height * .3
  speed = 0.01;

  particle = new Particle(centerX, centerY, 100, offset, 0, speed, 'rgba(250, 210, 255, 1)');
  particle2 = new Particle(200, centerY, 150, offset, 0, random(0.01, 0.1), 'rgba(250, 10, 255, 1)');

}

function draw() {
  background(51);
  particle.update();
  particle2.update();
}

function Particle(x, y, radius, offset, startAngle, speed, color) {

  this.x = x;
  this.y = y;
  this.radius = radius;
  this.offset = offset;
  this.startAngle = startAngle;
  this.speed = speed;
  this.color = color;

  this.render = function() {

    var y = this.y + Math.sin(this.startAngle) * this.offset;
    var scaling_offset = this.radius * 0.8;
    var radius = this.radius + Math.cos(this.startAngle) * scaling_offset;
    
    noStroke();
    fill(this.color);
    arc(this.x, y, radius, radius, 0, TWO_PI);

  }

  this.update = function() {

    this.render();
    this.startAngle += this.speed;

  }

}