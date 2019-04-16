
let numbers = [];
let sequence =[];
let count = 1;
let index = 0;
let arcs = [];
let biggest = 0;

//arco con geometría dependiente de la posición espacial y temporal de la sucesión
class Arc {
	constructor(start,end,dir)
	{
		this.start = start;
		this.end = end;
		this.dir = dir;
	}

	show() {
		let diameter = abs(this.end - this.start);
		let x = (this.end + this.start) / 2;
		stroke(0);
		noFill();
		if(this.dir == 0){
			arc(x,0,diameter,diameter,PI,0);
		}
		else{
			arc(x,0,diameter,diameter,0,PI);
		}
	}
}

function setup(){
	var mycanvas = createCanvas(600,600);
	mycanvas.parent('sketch-holder');
	frameRate(30);
	background(255);
	numbers[index] = true;
	sequence.push(index);
}

//calcula el siguiente paso en la sucesión, y agrega un arco en función de esa geometría
function step(){
	let next = index - count;
	if( next < 0 || numbers[next] ){
		next = index + count;
	}

	numbers[next] = true;
	sequence.push(next);

	let a = new Arc(index,next,count % 2);
	arcs.push(a);

	index = next;

	if (index > biggest){
		biggest = index;
	}

	count++;

}

function draw(){
	step();
	translate(0, height/2);
	scale(width/biggest);
	background(255);
	for (let a of arcs){
		a.show();
	}

}
