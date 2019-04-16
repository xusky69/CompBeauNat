//basado en https://www.youtube.com/watch?v=E1B4UoSQMFw

var axiom = "F";
//"F[-F]F[+F]F";
var pattern = "FF+[+F-F-F]-[-F+F+F]";
var len = 100;

//esta función genera el patrón de crecimiento
function generate () {
  len *= 0.58;
  parts=axiom.split("");

  for(i=0; i<parts.length; i++){
    switch(parts[i]){
      case "F":
      parts[i]=pattern;
      break;
    }
  }

  axiom = parts.join("");
  turtle();

}

//esta función dibuja una iteración al ejecutarse
function turtle () {
  resetMatrix();
  stroke(255);
  translate(width / 2, height);
  parts=axiom.split("");

  for(i=0; i<parts.length; i++){
    switch(parts[i]){

      case "F":
      line(0, 0, 0, -len);
      translate(0, -len);
      break;

      case "+":
      rotate(angle);
      break;

      case "-":
      rotate(-angle);
      break;

      case "[":
      push();
      break;

      case "]":
      pop();
      break;
    }
  }
}

//función de inicialización de la librería p5
function setup () {
  var canvas = createCanvas(750,750);
  canvas.parent('sketch-holder');

  background(10);
  angle = radians(25);
  turtle();
}
