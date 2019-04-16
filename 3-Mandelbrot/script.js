//basado en https://progur.com/2017/02/create-mandelbrot-fractal-javascript.html

// Crea el canvas y le da un contexto
var myCanvas = document.createElement("canvas");
myCanvas.width=800;
myCanvas.height=600;
maocanvas.appendChild(myCanvas);
var ctx = myCanvas.getContext("2d");

// esta función define la sucesión del conjunto M
// x e y son las coordenadas de c en el plano complejo
// z es el elemento de la sucesión, empieza en cero.
function mandel( x , y , z){
  return math.add( math.multiply(z,z) , math.complex(x,y) );
}

var iterations = 50;

// esta función retorna un booleano que indica si c pertenece al conjunto M
function checkIfBelongsToMandelbrotSet( x , y ){

  var z = math.complex(0,0);
  var inside;

  for(i=0; i<iterations; i++){

    z=mandel(x,y,z);

    if( math.norm(z) < 2){
      inside=1;
    }
    else{
      inside=0;
      break;
    };
  }
  return inside;
}

var magnificationFactor = 2900 ;
var panX = 0.7;
var panY = 0.6;

//dibuja el fractal
for(var x=0; x < myCanvas.width; x++) {
  for(var y=0; y < myCanvas.height; y++) {
    var belongsToSet =
    checkIfBelongsToMandelbrotSet(x/magnificationFactor - panX,
      y/magnificationFactor - panY);
      if(belongsToSet) {
        ctx.fillRect(x,y, 1,1);
      }
    }
  }
