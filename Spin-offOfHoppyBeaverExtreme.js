/*changed win state to display red background with different win message*/
/*added red badSticks which substract score when collected*/
/*need at least 10 points to win*/


var Beaver = function(x, y) {
    this.x = x;
    this.y = y;
    this.img = getImage("creatures/Hopper-Happy");
    this.sticks = 0;
    this.badSticks = 0;
};

Beaver.prototype.draw = function() {
    fill(255, 0, 0);
    this.y = constrain(this.y, 0, height-50);
    image(this.img, this.x, this.y, 40, 40);
};

Beaver.prototype.hop = function() {
    this.img = getImage("creatures/Hopper-Jumping");
    this.y -= 5;
};

Beaver.prototype.fall = function() {
    this.img = getImage("creatures/Hopper-Happy");
    this.y += 5;
};

Beaver.prototype.checkForStickGrab = function(stick) {
    if ((stick.x >= this.x && stick.x <= (this.x + 40)) &&
        (stick.y >= this.y && stick.y <= (this.y + 40))) {
        stick.y = -400;
        this.sticks++;
    }
};

Beaver.prototype.checkForBadStickGrab = function(badStick) {
    if ((badStick.x >= this.x && badStick.x <= (this.x + 40)) &&
        (badStick.y >= this.y && badStick.y <= (this.y + 40))) {
        badStick.y = -400;
        this.sticks-- ;
    }
};


var badStick = function(x, y) {
  this.x = x;
  this.y = y;
};

badStick.prototype.draw = function() {
    fill(255, 18, 18);
    rectMode(CENTER);
    rect(this.x, this.y, 5, 40);
};

var Stick = function(x, y) {
    this.x = x;
    this.y = y;
};

Stick.prototype.draw = function() {
    fill(89, 71, 0);
    rectMode(CENTER);
    rect(this.x, this.y, 5, 40);
};

var beaver = new Beaver(200, 300);

var sticks = [];
for (var i = 0; i < 40; i++) {  
    sticks.push(new Stick(i * 40 + 300, random(20, 260)));
}

var badSticks = [];
for (var i = 0; i < 40; i++) {  
    badSticks.push(new badStick(i * 40 + 300, random(20, 260)));
}

var grassXs = [];
for (var i = 0; i < 25; i++) { 
    grassXs.push(i*20);
}

draw = function() {
    
    // static
    background(227, 254, 255);
    fill(130, 79, 43);
    rectMode(CORNER);
    rect(0, height*0.90, width, height*0.10);
    
    for (var i = 0; i < grassXs.length; i++) {
        image(getImage("cute/GrassBlock"), grassXs[i], height*0.85, 20, 20);
        grassXs[i] -= 1;
        if (grassXs[i] <= -20) {
            grassXs[i] = width;
        }
    }
    
    for (var i = 0; i < sticks.length; i++) {
        sticks[i].draw();
        beaver.checkForStickGrab(sticks[i]);
        sticks[i].x -= 1;
    }
    
     for (var i = 0; i < badSticks.length; i++) {
        badSticks[i].draw();
        beaver.checkForBadStickGrab(badSticks[i]);
        badSticks[i].x -= 1;
    }
    
    textSize(18);
    
    
    text("Score: " + beaver.sticks, 20, 30);
     
    
    if (beaver.sticks >= 10) {
        textSize(36);
        text("WINNER EXTREME", 100, 200);
        background(255, 0, 0);
    }
    
    if (keyIsPressed && keyCode === 0) {
        beaver.hop();
    } else {
        beaver.fall();
    }
    beaver.draw();
};

