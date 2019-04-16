
function plot1(u,v,t){
  var trace1 = {
    x: t,
    y: u,
    mode: 'lines',
    type: 'scatter',
    name: 'presa',
    marker: { size: 3, color: 'red' }
  };

  var trace2 = {
    x: t,
    y: v,
    mode: 'lines',
    type: 'scatter',
    name: 'depredador',
    marker: { size: 3, color: 'green'}
  };

  var data = [ trace1, trace2 ];

  var layout = {
    showlegend: true,
    legend: {"orientation": "h"},
    font: { family: 'Courier New, monospace', size: 14, color: '#7f7f7f'},
    hovermode:'closest',
    title:'Evolucion poblacional a lo largo del tiempo',
    xaxis:{zeroline:false, hoverformat: '.2f', title: 'Tiempo', fixedrange:true},
    yaxis:{zeroline:false, hoverformat: '.2r', title: 'Poblacion', fixedrange:true}
  };

  Plotly.newPlot('plotDiv', data, layout,{scrollZoom: true, displayModeBar: false, staticPlot: false});
}

function plot2(u,v,t){

  var trace1 = {
    x: u,
    y: v,
    mode: 'markers',
    type: 'scatter',
    name: 'presa',
    marker: { size: 8, color: t }
  };

  var data = [trace1];

  var layout = {
    showlegend: true,
    legend: {"orientation": "h"},
    font: { family: 'Courier New, monospace', size: 14, color: '#7f7f7f'},
    hovermode:'closest',
    xaxis:{zeroline:false, hoverformat: '.2f', title: 'Presa', fixedrange:true},
    yaxis:{zeroline:false, hoverformat: '.2r', title: 'Depredador', fixedrange:true}
  };

  Plotly.newPlot('plotDiv2', data, layout,{scrollZoom: true, displayModeBar: false, staticPlot: false});
}

function makePlot(T, N, t_0, x_0, y_0, A, B, C, D){

  //tiempo máximo (a partir del tiempo inicial)
  //var T = 20;
  //var N = 200;
  //paso de tiempo
  var h = T / N;
  //condición inicial
  //var t_0 = 0;
  //var x_0 = 10;
  //var y_0 = 5;
  //arreglo que almacena los valores de t
  var t = [];
  t[0] = t_0;
  //arreglo que almacena los valores de x
  var u = [];
  u[0] = x_0;
  //arreglo que almacena los valores de y
  var v = [];
  v[0] = y_0;
  //parámetros de las ecuaciones
  //var A = 1.5;
  //var B = 1;
  //var C = 3;
  //var D = 1;

  //función que define la primera ecuación diferencial
  function f1(t,x,y){
    return (A*x - B*x*y) ;
  }

  //función que define la segunda ecuación diferencial
  function f2(t,x,y){
    return (-C*y + D*x*y) ;
  }

  // variables de RK-4 para x
  var K1, K2, K3, K4;
  //variables de RK-4 para y
  var Q1, Q2, Q3, Q4;

  //este es el RK-4, exporta los valores de x al arreglo u, los de y al arreglo v y los de tiempo al arreglo t
  for(let i=0; i<N; i++){

    K1 = f1(t[i], u[i], v[i]);
    Q1 = f2(t[i], u[i], v[i]);
    K2 = f1(t[i] + h/2, u[i] + (h/2)*K1, v[i] + (h/2)*Q1);
    Q2 = f2(t[i] + h/2, u[i] + (h/2)*K1, v[i] + (h/2)*Q1);
    K3 = f1(t[i] + h/2, u[i] + (h/2)*K2, v[i] + (h/2)*Q2);
    Q3 = f2(t[i] + h/2, u[i] + (h/2)*K2, v[i] + (h/2)*Q2);
    K4 = f1(t[i] + h/2, u[i] + h*K3    , v[i] + h*Q3);
    Q4 = f2(t[i] + h/2, u[i] + h*K3    , v[i] + h*Q3);

    u[i+1] = (u[i] + (h/6)*(K1 + 2*K2 + 2*K3 + K4));
    v[i+1] = (v[i] + (h/6)*(Q1 + 2*Q2 + 2*Q3 + Q4));
    t[i+1] = t_0;
    t_0 += h;

  }

  plot1(u,v,t);
  plot2(u,v,t);


}

function eval (){
  var a = Number(document.getElementById("alfa").value);
  var b = Number(document.getElementById("beta").value);
  var c = Number(document.getElementById("gamma").value);
  var d = Number(document.getElementById("delta").value);
  var press = Number(document.getElementById("press").value);
  var predd = Number(document.getElementById("predd").value);
  var time =  Number(document.getElementById("time").value);

  makePlot(time, 1000, 0, press, predd, a, b, c, d);

}
