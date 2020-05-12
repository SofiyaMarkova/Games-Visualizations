noStroke();
background(0, 0, 0);
var r = 255;
var g = 90;
var b = 0;
fill(r, g, b);
//put into center

for (var x = 0 ; x < 360 ; x +=30){
fill(r,g,b);
r -= 13;
g += 12;
b += 11;
pushMatrix();
translate(200,200);
rotate(x);
rect(0, 0, 150, 15);
popMatrix();
}
