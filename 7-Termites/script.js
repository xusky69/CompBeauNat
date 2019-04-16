// parámetros de inicialización aleatoria
let umbral = 0.05;
let dummy;

// crea un arreglo 2x2 de tamaño colsxrows inicializado con ceros
function make2DArray(cols,rows){
  let arr = new Array(cols);

  for(let i = 0; i < cols; i++){
    arr[i] = new Array(rows);
  }
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      arr[i][j] = 0;
    }
  }
  return arr;
}

// llena el arreglo de booleanos aleatorios
function randomizeArray(arr,cols,rows){
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      dummy = Math.random();
      if (dummy<umbral){
        arr[i][j] = 1;
      }
      else{
        arr[i][j] = 0;
      }
    }
  }
  return arr;
}

function position(z,cols){
  if(z>cols-1){
    z = 0;
  }
  else if(z<0){
    z = cols-1;
  }
  else{
    z=z;
  }
  return z;
}

// parametros geometricos

let resolution = 10;
let canvasx = 700;
let canvasy = 700;
let cols = Math.floor(canvasx / resolution);
let rows = Math.floor(canvasy / resolution);
let numHormigas = 100;
let ants = new Array();
let randomX = Math.floor(Math.random() * (cols)) +0;
let randomY = Math.floor(Math.random() * (rows)) +0;
let randomWood = Math.floor(Math.random() * (2)) +0;
var  grid = new Array();
grid = make2DArray(cols,rows);
grid = randomizeArray(grid, cols, rows);

//clase hormiga
class ant {
  constructor(x,y,madera){
    this.x = x;
    this.y = y;
    this.madera = madera;
  }
}

// enjambre de hormigas
for (let k=0; k < numHormigas; k++){
  ants.push(new ant(Math.floor(Math.random() * (cols)) +0,Math.floor(Math.random() * (rows)) +0,Math.floor(Math.random() * (2)) +0));
}

// evoluciona el sistema
function evolve(ants){

  let stepx;
  let stepy;

  for(let n=0; n<numHormigas; n++){
    ant = ants[n];
    stepx = Math.floor(Math.random() * (3)) -1;
    stepy = Math.floor(Math.random() * (3)) -1;

    ant.x = position(ant.x + stepx,cols);
    ant.y = position(ant.y + stepy,rows);

    if(grid[ant.x][ant.y]==1 && ant.madera ==0 ){
      grid[ant.x][ant.y]=0;
      ant.madera=1;
    }
    if(grid[ant.x][ant.y]==1 && ant.madera ==1 )
    {
    	while (grid[ant.x][ant.y]==1){
    		ant.x = position(ant.x + Math.floor(Math.random() * (3)) -1  ,cols);
    		ant.y = position(ant.y + Math.floor(Math.random() * (3)) -1  ,rows);
    	}
    	grid[ant.x][ant.y] = 1;
    	ant.madera = 0;
    }

    if(ant.madera == 1 ){
      fill(255,69,0);
      rect(resolution*ant.x,resolution*ant.y,resolution-1,resolution-1);
    }
    else{
      fill(0,69,255);
      rect(resolution*ant.x,resolution*ant.y,resolution-1,resolution-1);
    }
    ants[n] = ant;
  }
}

// setup de p5.js
function setup(){
  var mycanvas = createCanvas(canvasx,canvasy);
  mycanvas.parent('sketch-holder');
  frameRate(60);

}

// colorea el canvas dependiendo del valor de cada celda
function draw(){
  background(255);
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let x = i*resolution;
      let y = j*resolution;
      if (grid[i][j] == 1){
        stroke(0);
        fill(0);
        rect(x,y,resolution,resolution);
      }
    }
  }

  evolve(ants);

}
