// aprendido de https://medium.com/datadriveninvestor/a-quick-example-of-genetic-evolution-in-javascript-lets-make-a-baby-5a6f20d5de84

// cantidad de bichos
var population;
// tiempo de vida de cada bicho (en iteraciones)
var lifespan = 250;

var visualLifespan //variable intermediaria
var count = 0; //mide la esperanza de vida
var target; //el lugar que deben alcanzar los palitos
var generation = 1;


// cada stick es uno de los bichos, aquí se define su clase
function Stick(dnas) {
  // hereda un gen apto o de lo contrario asigna uno nuevo
  if (dnas) {
    this.dna = dnas;
  } else {
    this.dna = new dna();
  }

  this.pos = createVector(width / 2, height); //posición del palito
  this.vel = createVector() //velocidad del palito
  this.acc = createVector() //aceleración del palito

  // este método define un impulso sobre el palito
  this.applyForce = function(force){
    this.acc.add(force); //permite el movimiento
  }

  // este método actualiza la posición y velocidad del palito
  this.update = function() {
    this.applyForce(this.dna.genes[count]) // asocia una gen de movimiento al palito
    this.vel.add(this.acc) // le da un impulso al palito
    this.pos.add(this.vel) // actualiza la posición del palito dada su velocidad
    this.acc.mult(0) // resetea su impulto
  }

  // dibuja el palito en el canvas de p5.js
  this. show = function(){
    push();
    noStroke();
    fill(0, 150);
    translate(this.pos.x, this.pos.y) //mueve el palito
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
  }

  this.fitness = 0; //define el fitness inicial para cada palito

  // calcula la función fitness al final de cada generación para el palito
  this.calculateFitness = function() {
    var distance = dist(this.pos.x, this.pos.y, target.x, target.y)
    this.fitness = map(distance, 0, width, width, 0)
  }

}

// esta clase inicializa los bichos
function Population() {

  this.sticks = []

  //tamaño de la población
  this.populationSize = 25

  //pool de genes
  this.pool = []

  //inicializa la población de genes
  for(var i = 0; i < this.populationSize; i++) {
    this.sticks[i] = new Stick()
  }

  //abstrae los mejores fitness de cada generación
  this.evaluate = function() {
    var maxFitness = 0
    for(var i = 0; i < this.populationSize; i++) {
      this.sticks[i].calculateFitness()
      if (this.sticks[i].fitness > maxFitness) {
        maxFitness = this.sticks[i].fitness // calcula el umbral de fitness para caa generación
      }
    }

    for(var i = 0; i < this.populationSize; i++) {
      this.sticks[i].fitness /= maxFitness // normaliza el fitness
    }

    for(var i = 0; i < this.populationSize; i++) {
      var n = this.sticks[i].fitness * 100
      for (var j = 0; j < n; j++) {
        this.pool.push(this.sticks[i]) //almacena los sticks más aptos en un pool
      }
    }
  }
  // "reproduce" cada stick asociándole un par de padres del pool de genes aptos
  this.selection = function() {
    var newSticks = [];
    for (var i = 0; i < this.sticks.length; i++) {

      var parentA = random(this.pool).dna;
      var parentB = random(this.pool).dna;

      var child = parentA.crossover(parentB); //cruza dos palitos para crear uno nuevo

      newSticks[i] = new Stick(child); //almacena la nueva generación
    }

    this.sticks = newSticks; //reemplaza la vieja generación por la nueva
  }

  this.run = function() {
    for(var i = 0; i < this.populationSize; i++) {
      this.sticks[i].update()
      this.sticks[i].show()
    }
  }
}

// función que define el ADN
function dna(genes) {

  if (genes) {
      this.genes = genes
  } else {
      this.genes = []

      for (var i = 0; i < lifespan; i++) {
          this.genes[i] = p5.Vector.random2D()
          this.genes[i].setMag(0.2)
      }
  }

  // método que define la reproducción de dos genes
  this.crossover = function(partner) {
    var newgenes = [];

    var mid = floor(random(this.genes.length));
    for (var i = 0; i < this.genes.length; i++) {

      if (i > mid) {
        newgenes[i] = this.genes[i];
      }

      else {
        newgenes[i] = partner.genes[i];
      }
    }

    return new dna(newgenes);
  }
}

// setup de p5.js
function setup() {
  var mycanvas = createCanvas(800,600);
  mycanvas.parent('sketch-holder')
  population = new Population();
  visualLifespan = createP();
  generationCount = createP(); // crea un label <p></p> de html
  target = createVector(width / 2, 50); //ubica el target
}

// dibuja cada generación
function draw() {
  background(255); //color del canvas
  population.run(); // crea una generación de palitos
  visualLifespan.html(count);
  visualLifespan.parent('sketch-holder'); // escribe el tiempo de vida en el <p> creado
  count++; // aumenta el tiempo en un paso

  //crea una generación nueva cuando el número de iteraciones se acerca al tiempo de vida
  if (count == lifespan) {
    population.evaluate()
    population.selection()
    count = 0;
    generation++;
    generationCount.html(generation);
    generationCount.parent('sketch-holder');
  }
  fill(0);
  stroke(0);
  ellipse(target.x, target.y, 16, 16);
}
