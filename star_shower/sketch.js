var stars;
var mini_stars;
let background_stars;
var backgroundGradient;
var canvas_context;
var ticker = 0;
let randomSpawnRate = 75;
var groundHeight = 100;

function setup() {

  canvas_context = createCanvas(windowWidth, windowHeight);
  canvas_context.parent('myContainer');

  stars = [];
  mini_stars = [];
  background_stars = [];

  // for (var i = 0; i < 2; i++) {
  //   // var star_color = color(random(200, 250), 0, random(150, 200));
  //   var star_color = 'E3EAEF';

  //   stars.push(new Star(random(width), random(-200, 0), random(10, 30), star_color));
  // }

  for (var j = 0; j < 250; j++) {
    // var star_color = color(random(200, 250), 0, random(150, 200));
    background_stars.push(new Star(random(width), random(height), random(1, 3), 'white'));
  }

}

function draw() {
  var bg_color = lerpColor(color(0, 0, 0), color(200, 0, 200), 0.12);
  background(bg_color);

  for (var k = 0; k < background_stars.length; k++) {
    background_stars[k].render();
  }

  noStroke();
  createMountainRange(1, height - 50, '#384551');
  createMountainRange(2, height - 100, '#2B3843');
  createMountainRange(3, height - 300, '#26333E');

  fill(bg_color);
  rect(0, height - groundHeight, width, groundHeight);

  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    if (stars[i].radius <= 0) {
      stars.splice(i, 1);
    }

  }

  for (var j = mini_stars.length - 1; j > 0; j--) {

    mini_stars[j].update();
    if (mini_stars[j].ttl <= 0 && mini_stars[j].radius <= 0) { // Can get rid of the ttl check
      mini_stars.splice(j, 1);
    }

  }

  ticker++;

  if (ticker % randomSpawnRate === 0) {
    const radius = 25;
    const x = max(radius, random(width) - radius);
    stars.push(new Star(x, -100, radius, 'white'));
    randomSpawnRate = Math.floor(random(105, 200));

  }

}

function createMountainRange(mountainAmount, mountain_height, mountain_color) {

  for (let i = 0; i < mountainAmount; i++) {

    const mountainWidth = width / mountainAmount;
    // line(0, height, width, height);
    // line(width / 2, 100 - mountain_height, 0, height);

    fill(mountain_color);

    // line(0, height * 0.33, width, height * 0.33);
    // line(width, height * 0.33, width / 2, 100);
    // line(width / 2, 100, 0, height * 0.33);

    triangle(i * mountainWidth - 325, height, i * mountainWidth + mountainWidth + 325, height, (i * mountainWidth + mountainWidth / 2), (height - mountain_height));

  }

}

function Star(x, y, radius, star_color) {

  this.x = x;
  this.y = y;
  this.radius = radius;
  this.star_color = star_color;
  this.velocity = {
    // x: (random() - 0.5) * 8,
    x: random(-10,10),
    y: random(1, 5)
  };

  this.friction = 0.8;
  this.gravity = 1;

  this.render = function() {

    fill(this.star_color);
    // ellipse(this.x, this.y, this.radius, this.radius);
    arc(this.x, this.y, this.radius, this.radius, 0, TWO_PI);

  }

  this.update = function() {

    this.render();

    if (this.y + (this.radius / 2) + this.velocity.y > height - groundHeight) {
      // this.y = random(-500, 0);
      this.velocity.y = -this.velocity.y * this.friction;
      this.shatter();
    } else {
      // Add Gravity
      this.velocity.y += this.gravity;
    }

    // Side of screen
    if (this.x + this.radius + this.velocity.x > width || this.x - this.radius <= 0) {
      this.velocity.x = -this.velocity.x * this.friction;
      this.shatter();

    }

    this.y += this.velocity.y;
    this.x += this.velocity.x;

  }

  this.shatter = function() {

    this.radius -= 3;

    for (var i = 0; i < 6; i++) {

      // var star_color = color(random(200, 250), 0, random(150, 200));
      var star_color = `rgba(0, 0, 250)`;

      mini_stars.push(new MiniStar(this.x, this.y, 4, star_color));
    }

  }

}

function MiniStar(x, y, radius, star_color) {

  this.x = x;
  this.y = y;
  this.radius = radius;
  this.star_color = star_color;
  this.velocity = {
    x: random(-5, 5),
    y: random(-15, 15)
  };

  this.friction = 0.8;
  this.gravity = 0.2;
  this.ttl = 150;
  this.opacity = 1;
  this.c = 0;

  this.render = function() {

    // console.log("Opacity : " + this.opacity);
    // this.star_color = `rgba(0, 126, 255, ${this.opacity})`;
    // var c = `rgba(0, 126, 255, ${this.opacity})`;

    if (this.opacity >= 0) {
      // canvas_context.save();
      this.c = `rgba(227, 234, 239, ${this.opacity})`;
      // drawingContext.shadowOffsetX = 2;
      // drawingContext.shadowOffsetY = -2;
      // drawingContext.shadowBlur = 10;
      // drawingContext.shadowColor = "#E3EAEF";

      // canvas_context.restore();
    }

    fill(this.c);
    noStroke();
    // ellipse(this.x, this.y, this.radius, this.radius);
    arc(this.x, this.y, this.radius, this.radius, 0, TWO_PI);

  }

  this.update = function() {

    this.render();

    if (this.y + (this.radius / 2) + this.velocity.y > height - groundHeight) {
      this.velocity.y = -this.velocity.y * this.friction;
      this.radius -= 0.5;
    } else {
      // Add Gravity
      this.velocity.y += this.gravity;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.ttl -= 1;

    this.opacity -= 1 / this.ttl; // Sub some ratio from time to live
    // this.opacity = map((1/this.ttl), 0, 1, 0, 100);
  }

}
