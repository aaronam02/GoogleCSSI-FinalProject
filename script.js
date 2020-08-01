/* global round, sqrt,splice, noLoop, ,RADIUS, CENTER, rectMode, windowWidth, collideCircleCircle, windowHeight, keyCode, keyIsDown, keyIsPressed, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, collideRectCircle, collideCircleCircle, random, mouseIsPressed, clear, textSize, createCanvas, strokeWeight, rect, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY */

let num,
  i,
  x,
  balls,
  balls2,
  colors,
  chooseRandomColor,
  backgroundColor,
  shootingcolors,
  spherePosition,
  rectPosition,
  mousePosition,
  space,
  score,
  ballPosition;

function setup() {
  score = 0;
  // Canvas & color settings
  space = 30;
  createCanvas(400, 650);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  let i = 0;
  // The spherePosition variable contains object, it is initialized using "Object Notation"
  spherePosition = {
    x: 100,
    y: 100
  };

  rectPosition = {
    x: width / 2,
    y: height - 25
  };

  colors = ["red", "blue", "yellow", "green", "purple"];
  shootingcolors = {
    one: colors[i],
    two: "blue"
  };

  let ballHeight = -500; //change ball height
  balls = [];
  for (let i = 0; i < 10; i++) {
    balls[i] = [];
    if (i % 2 == 0) {
      space = 55;
    } else {
      space = 30;
    }
    for (let x = 0; x < 8; x++) {
      balls[i].push(new fallingBalls(ballHeight));

      // if (balls[i].isGameOver)
      //   {
      //     console.log("GAME OVER");
      //   }
    }

    ballHeight += 50;
  }
}

function draw() {
  background(backgroundColor);
  fill(shootingcolors.two);
  ellipse(spherePosition.x, spherePosition.y, 30, 30);
  //call method change rect color
  fill(shootingcolors.one);
  rectMode(RADIUS);
  rect(rectPosition.x, rectPosition.y, 150, 30);
  line(
    spherePosition.x,
    spherePosition.y + 14,
    rectPosition.x + 10,
    rectPosition.y - 30
  );
  showBalls();
  fill("black");

  for (let i = 0; i < balls.length; i++) {
    for (let x = 0; x < balls[i].length; x++) {
      if (balls[i][x].isGameOver()) {
        fill("black");
        console.log("GAME OVER");
        text(`GAME OVER`, width / 2.25, height - 20);
        noLoop();
      } else {
        text(`Score: ${score}`, width / 2.25, height - 20);
      }
    }
  }

  mousePosition = {
    x: mouseX,
    y: mouseY
  };

  // let distance2 = round(computeDistance(mousePosition, rectPosition));
  // text(`The distance between the mouse and rectangle is ${distance2}`, 20, 40);

  let distanceCategory = computeDistanceCategory(mousePosition, rectPosition);

  for (let i = 0; i < balls.length; i++) {
    for (let x = 0; x < balls[i].length; x++) {
      if (balls[i][x].checkCollisions()) {
        balls[i].splice(x, 1);
        score += 1;
      }
    }
  }
}

function mousePressed() {
  spherePosition.x = mouseX;
  spherePosition.y = mouseY;
  i = random(0, colors.length);
  shootingcolors.two = shootingcolors.one;
  shootingcolors.one = random(colors);
}

function computeDistance(pointA, pointB) {
  let deltaX = pointA.x - pointB.x;
  let deltaY = pointA.y - pointB.y;

  let distance = sqrt(deltaX ** 2 + deltaY ** 2);
  return distance;
}

function computeDistanceCategory(pointA, pointB) {
  let distance = computeDistance(pointA, pointB);

  if (distance > 200) {
    //cold
    backgroundColor = color(240, 10, 100);
  } else if (distance > 50) {
    //warm
    backgroundColor = color(120, 10, 100);
  } else {
    //hot
    backgroundColor = color(0, 10, 100);
  }
}

function showBalls() {
  for (let i = balls.length - 1; i >= 0; i--) {
    for (let x = balls[i].length - 1; x >= 0; x--) {
      balls[i][x].display();
    }
  }
}

class fallingBalls {
  constructor(yPos) {
    this.xPos = space;
    this.r = 25;
    // space+= (this.r+this.r);
    space += 52.5;
    this.yPos = yPos;
    // Randomly generate color
    this.color = random(colors);
  }

  fall() {
    this.xPos += 0;
    this.yPos += 0.25;
  }

  isGameOver() {
    for (let i = balls.length - 1; i >= 0; i--) {
      for (let x = balls[i].length - 1; x >= 0; x--) {
        if (
          collideRectCircle(
            rectPosition.x,
            rectPosition.y,
            150,
            30,
            balls[i][x].xPos,
            balls[i][x].yPos,
            60
          )
        ) {
          //returns true of the game is over
          return true;
        }
      }
    }
  }
  
  display() {
    fill(this.color);
    ellipse(this.xPos, this.yPos, this.r * 2);
    this.fall();
  }

  checkCollisions() {
    let hit = collideCircleCircle(
      spherePosition.x,
      spherePosition.y,
      20,
      this.xPos,
      this.yPos,
      60
    );
    if (hit) {
      if (shootingcolors.two === this.color) {
        return true;
      }
    }
  }
}
