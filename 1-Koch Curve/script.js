
//Esta funcion genera la sucesión de Thue-Morse
function generateSequence(iteraciones){
  var sequence = "0";
  for (k = 0; k < iteraciones; k++){
    var complemento = "";
    var partes = sequence.split("");
    for (j = 0; j < sequence.length; j++){
      switch (partes[j]){
        case "0":
        complemento += "1";
        break;
        case "1":
        complemento += "0";
        break;
      }
    }
    sequence += complemento;
  }
  return sequence;
}

var ctx = myCanvas.getContext("2d");

//Esta funcion dibuja la curva de Koch a partir de la sucesión anterior usando el canvas de HTML
function draw() {
  var sequence = generateSequence(20);
  var parts = sequence.split("");
  ctx.translate(0, myCanvas.height);
  ctx.beginPath();
  ctx.moveTo(0,0);
  for(var i = 0; i < parts.length; i++) {
    if(parts[i] == "0") {
      ctx.translate(0,0.1);
      ctx.lineTo(0,0.1);
    } else {
      ctx.rotate(Math.PI/3);
    }
  }
  ctx.stroke();
}

draw();
