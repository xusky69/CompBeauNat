//se usó como guía https://www.youtube.com/watch?v=FWSR_7kZuYg

let grid;
let resolution = 10 ;
let canvasx = 700;
let canvasy = 700;

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
      arr[i][j] = floor(random(2));
    }
  }
  return arr;
}

// evoluciona el sistema
function evolve(grid,cols,rows){

  let next = make2DArray(cols,rows);

  for(let l = 1; l < cols-1; l++){
    for(let k = 1; k < rows-1; k++){
      //contar los vecinos vivos
      i = l
      j = k
      let sum = 0;
      sum += grid[i-1][j-1];
      sum += grid[i-1][j];
      sum += grid[i][j-1];
      sum += grid[i+1][j+1];
      sum += grid[i+1][j];
      sum += grid[i][j+1];
      sum += grid[i-1][j+1];
      sum += grid[i+1][j-1];
      //aplicar la norma
      if ( grid[i][j]==1 && sum<2 ){next[i][j]=0;}
      else if ( grid[i][j]==1 && sum>3 ){next[i][j]=0;}
      else if ( grid[i][j]==0 && sum==3){next[i][j]=1;}
      else{next[i][j] = grid[i][j];}
    }
  }
  return next;
}

// setup de p5.js
function setup(){
  var canvas = createCanvas(canvasx,canvasy);
  canvas.parent('sketch-holder');
  frameRate(10);
  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols,rows);
  grid = randomizeArray(grid, cols, rows);
}

// colorea el canvas dependiendo del valor de cada celda
function draw(){
  background(255);
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let x = i*resolution;
      let y = j*resolution;
      if (grid[i][j] == 1){
        stroke(255);
        fill(0);
        rect(x,y,resolution-1,resolution-1);
      }
    }
  }
  grid = evolve(grid,cols,rows);
}
