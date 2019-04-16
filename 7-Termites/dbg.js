// parámetros de inicialización aleatoria
let umbral = 0.2;
let dummy;

// parametros geometricos
let grid = new Array();
let resolution = 5;
let canvasx = 500;
let canvasy = 500;
let cols = Math.floor(canvasx / resolution);
let rows = Math.floor(canvasy / resolution);
let numHormigas = 100;
let ants = new Array();
let randomX = Math.floor(Math.random() * (cols)) +0;
let randomY = Math.floor(Math.random() * (rows)) +0;
let randomWood = Math.floor(Math.random() * (2)) +0;
grid = make2DArray(cols,rows);
grid = randomizeArray(grid, cols, rows);

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
      arr[i][j] = Math.floor(Math.random() * (2)) +0;
    }
  }
  return arr;
}



class ant {
  constructor(x,y,madera){
    this.x = x;
    this.y = y;
    this.madera = madera;
  }
}

for (let k=0; k < numHormigas; k++){
  ants.push(new ant(Math.floor(Math.random() * (cols)) +0,Math.floor(Math.random() * (rows)) +0,Math.floor(Math.random() * (2)) +0));
}

  for(let n=0; n<numHormigas; n++){
    ant.x = ants[n].x;
    ant.y = ants[n].y
    stepx = Math.floor(Math.random() * (3)) -1;
    stepy = Math.floor(Math.random() * (3)) -1;
    ant.x += stepx;
    ant.y += stepy;

    if (ant.x >= cols){
      ant.x = 1;
    }
    if (ant.x <= 0){
      ant.x = cols-1
    }
    if (ant.y >= rows){
      ant.x = 1;
    }
    if (ant.y <= 0){
      ant.y = rows-1
    }

    document.write(stepx);
    document.write(" ");
    document.write(stepy);
    document.write(" ");
    document.write(grid[ant.x][ant.y]);
    document.write(" ");
    document.write(ant.x);
    document.write(" ");
    document.write(ant.y);
    document.write("\n");
    document.write("<br>");

  }
