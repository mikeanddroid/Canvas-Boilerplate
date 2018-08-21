var centerY;
var centerX;
var offset; // How far you want the animation to happen
var x_speed, y_speed; // How fast you want the angle to change
var angle = 0; // Initial starting angle

var particle, particle2;

function setup() {
  createCanvas(innerWidth, innerHeight);
  centerY = height / 2;
  centerX = width / 2;
  offset = height * .3
  x_speed = 0.01;
  y_speed = 0.08;

  particle = new Particle(centerX * 1.5, centerY, 20, offset, 0, x_speed, x_speed, 'rgba(250, 210, 255, 1)');
  particle2 = new Particle(centerX * 0.5, centerY, 50, offset, 0, random(0.01, 0.1), y_speed, 'rgba(250, 10, 255, 1)');

}

function draw() {
  background(51);
  particle.update();
  particle2.update();
  
  // translate(centerX, centerY);
  // rotate(PI/3);  
    
  // stroke('white');
  // line(centerX, centerY, centerX + 200, centerY);
  // line(centerX + 200, centerY, centerX + 150, centerY - 50);
  // line(centerX + 200, centerY, centerX + 150, centerY + 50);
    
}

function Particle(x, y, radius, offset, startAngle, x_speed, y_speed, color) {

  this.x = x;
  this.y = y;
  this.radius = radius;
  this.offset = offset;
  this.startAngle = startAngle;
  this.y_angle = 0;
  this.x_speed = x_speed;
  this.y_speed = y_speed;
  this.color = color;

  this.render = function() {

    var x = this.x + Math.cos(this.startAngle) * this.offset;
    // Could change Y angle with different velocity for a Lissajous Curve
    var y = this.y + Math.sin(this.y_angle) * this.offset;
    var scaling_offset = this.radius * 0.8;
    var radius = this.radius + Math.cos(this.startAngle) * scaling_offset;

    noStroke();
    fill(this.color);
    arc(x, y, radius, radius, 0, TWO_PI);

  }

  this.update = function() {

    this.render();
    this.startAngle += this.x_speed;
    this.y_angle += this.y_speed;

  }

}