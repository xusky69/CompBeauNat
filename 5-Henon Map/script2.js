function makePlot(){

  var a = 1.29;
  var b = 0.3;
  var p_t = 0.01;
  var x = [];
  var y = [];
  var time = 500;
  var timearray = [];
  const x_f = 0.838486;

  var X_t = math.matrix([
    [x],
    [y]
  ]);

  function atractor(x,y,time){
    x[0] = 0.838486;
    y[0] = 0;
    for(t=0; t<time; t++){
      x[t+1] = a - (x[t])**2 + b*y[t];
      y[t+1] = x[t];
      timearray[t+1] = t;
    }
  }

  atractor(x,y,time);

  plotAtractor(x,y);
  plotX(timearray,x);
  plotY(timearray,y);

  //  const bvector = math.matrix([
  //    [1],
  //    [0]
  //  ]);

  //  var A = math.matrix([
  //    [-2*x_t, b ],
  //    [1     , 0 ]
  //  ]);

  //  var dummy = math.multiply( A , bvector );

}

function plotAtractor(x,y){
  var trace1 = {
    x: x,
    y: y,
    mode: 'markers',
    type: 'scatter'
  }

  var data = [trace1];

  Plotly.newPlot('plotDiv1', data);
}

function plotX(timearray,x){
  var trace2 = {
    x: timearray,
    y: x,
    mode: 'lines+markers',
    type: 'scatter'
  }

  var data = [trace2];

  Plotly.newPlot('plotDiv2', data);
}

function plotY(timearray,y){
  var trace3 = {
    x: timearray,
    y: y,
    mode: 'lines+markers',
    type: 'scatter'
  }

  var data = [trace3];

  Plotly.newPlot('plotDiv3', data);
}


function eval (){
  makePlot();

}
