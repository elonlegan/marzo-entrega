var canvas = document.querySelector("#lienzo");
var ctx = canvas.getContext("2d");

// El método HTMLCanvasElement.getContext(): retorna un contexto de dibujo en el lienzo, o null si el identificador del contexto no está soportado.

/*=============================================
CUADROS
=============================================*/

//CONTORNO
/*ctx.lineWidth = 5;
ctx.strokeStyle = "rgba(255,025501)";
ctx.rect(10,10,522,100);
ctx.stroke();
//RELLENO
ctx.fillStyle = "cyan";
ctx.fillRect(10,10,522,100);




ctx.lineWidth= 5;
ctx.strokeStyle = "rgba(255,0,255,1)";
ctx.rect(10,10,500,100);
ctx.stroke();

ctx.rect(200,300,10,10);
ctx.stroke();

ctx.rect(400,400,10,10);
ctx.stroke();

//RELLENO
ctx.fillStyle = "cyan";
//ctx.fillRect(x1,y1,x2,y2);
ctx.fillRect(10,10,500,100);

*/

/*=============================================
CIRCULOS
=============================================*/

/*
ctx.beginPath();
// ctx.arc(x1, y1, r, startAngle, endAngle);
ctx.arc(300,300,80,0,2*Math.PI);

//RELLENO CIRCULO
ctx.fillStyle = "green";
ctx.fill();

//CONTORNO CIRCULO
ctx.lineWidth= 5;
ctx.strokeStyle = "purple";
ctx.stroke();

*/
/*=============================================
LINEAS
=============================================*/
/*
ctx.beginPath();

//ctx.moveTo(x1,y1);
ctx.moveTo(0,0);
//ctx.lineTo(x2,y2);
ctx.lineTo(200,200);
ctx.lineTo(400,200);
ctx.lineTo(600,400);
ctx.lineTo(800,200);
ctx.lineTo(1000,200);
ctx.lineTo(1000,0);

//Contorno línea
ctx.lineWidth = 5;
ctx.stroke();

//Relleno linea
ctx.fillStyle ='rgba(0,0,255,.6)';
ctx.fill();


*/
/*=============================================
CURVAS
=============================================*/
/*
ctx.beginPath();

ctx.moveTo(0,500);

//ctx.bezierCurveTo(cpx1,cpy1,cpx2,cpy2,x2,y2);
ctx.bezierCurveTo(200,300,400,400,500,500);

//Contorno curva
ctx.lineWidth = 5;
ctx.strokeStyle ='rgba(100,0,0,1)';
ctx.stroke();

//Relleno curva
ctx.fillStyle ='rgba(255,0,0,1)';
ctx.fill();

*/
/*=============================================
DEGRADADOS
=============================================*/
//ctx.createLinearGradient(x1,y1,x2,y2);
/*
var grd = ctx.createLinearGradient(0,300,100,400);
grd.addColorStop(0,"red");
grd.addColorStop(1,"yellow");
ctx.fillStyle=grd;
ctx.fillRect(0,300,100,100);

//ctx.createRadialGradient(x1,y1,r1,x2,y2,r2);
var grd2 = ctx.createRadialGradient(890,350,5,900,350,120);
grd2.addColorStop(0,"white");
grd2.addColorStop(1,"black");
ctx.beginPath();
ctx.arc(900,400,100,0,7);
ctx.fillStyle = grd2;
ctx.fill();
*/