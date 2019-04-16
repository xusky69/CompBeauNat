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

class ant {
  constructor(x,y,madera){
    this.x = x;
    this.y = y;
    this.madera = madera;
  }
}

//document.write(grid[2][3]);
